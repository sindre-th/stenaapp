package no.stena.app.pdf;

import org.springframework.core.io.ByteArrayResource;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.extend.ReplacedElementFactory;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public final class PdfGenerator {

    private static final String TEMPLATE_SUFFIX = ".html";
    private static final String TEMPLATE_DIR = "pdf/";

    public static ByteArrayResource createPDFResource(String template,
                                                      Map<String, Object> variables) throws IOException {
        return new ByteArrayResource(createPDFStream(template, variables).toByteArray());
    }

    private static ByteArrayOutputStream createPDFStream(String template,
                                                         Map<String, Object> variables) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ITextRenderer renderer = new ITextRenderer();
        ReplacedElementFactory logoFactory = createLogoFactory(renderer);
        renderer.getSharedContext().setReplacedElementFactory(logoFactory);
        renderer.setDocumentFromString(createHtml(template, variables));
        renderer.layout();
        renderer.createPDF(outputStream);
        outputStream.close();
        return outputStream;
    }

    private static String createHtml(String template, Map<String, Object> variables) {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(TEMPLATE_SUFFIX);
        templateResolver.setTemplateMode(TemplateMode.HTML);
        TemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);
        Context context = new Context();
        context.setVariables(variables);
        return templateEngine.process(TEMPLATE_DIR + template, context);
    }

    private static ReplacedElementFactory createLogoFactory(ITextRenderer renderer) {
        ReplacedElementFactory superFactory = renderer.getSharedContext().getReplacedElementFactory();
        ReplacedElementKeys keys = new ReplacedElementKeys("div", "logo", "img/logo.png");
        return new ReplacedElementFactoryImpl(superFactory, List.of(keys));
    }
}
