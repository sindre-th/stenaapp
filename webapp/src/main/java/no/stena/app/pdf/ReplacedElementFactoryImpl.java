package no.stena.app.pdf;

import com.lowagie.text.Image;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.w3c.dom.Element;
import org.xhtmlrenderer.extend.FSImage;
import org.xhtmlrenderer.extend.ReplacedElement;
import org.xhtmlrenderer.extend.ReplacedElementFactory;
import org.xhtmlrenderer.extend.UserAgentCallback;
import org.xhtmlrenderer.layout.LayoutContext;
import org.xhtmlrenderer.pdf.ITextFSImage;
import org.xhtmlrenderer.pdf.ITextImageElement;
import org.xhtmlrenderer.render.BlockBox;
import org.xhtmlrenderer.simple.extend.FormSubmissionListener;

import java.io.InputStream;
import java.util.List;

public class ReplacedElementFactoryImpl implements ReplacedElementFactory {

    private final ReplacedElementFactory superFactory;
    private final List<ReplacedElementKeys> elementKeys;

    public ReplacedElementFactoryImpl(ReplacedElementFactory superFactory,
                                      List<ReplacedElementKeys> elementKeys) {
        this.superFactory = superFactory;
        this.elementKeys = elementKeys;
    }

    @Override
    public ReplacedElement createReplacedElement(LayoutContext layoutContext,
                                                 BlockBox blockBox,
                                                 UserAgentCallback userAgentCallback,
                                                 int cssWidth, int cssHeight) {
        Element element = blockBox.getElement();
        if (element == null) {
            return null;
        }
        ReplacedElementKeys matchingKeys = getMatchingKeys(element);
        if (matchingKeys != null) {
            InputStream input = null;
            try {
                input = new ClassPathResource(matchingKeys.resourceName()).getInputStream();
                final byte[] bytes = IOUtils.toByteArray(input);
                final Image image = Image.getInstance(bytes);
                FSImage fsImage = new ITextFSImage(image);
                if ((cssWidth != -1) || (cssHeight != -1)) {
                    fsImage = fsImage.scale(cssWidth, cssHeight);
                }
                return new ITextImageElement(fsImage);
            } catch (Exception e) {
                throw new RuntimeException("There was a problem trying to read a template embedded graphic.", e);
            } finally {
                IOUtils.closeQuietly(input);
            }
        }
        return this.superFactory.createReplacedElement(layoutContext, blockBox, userAgentCallback, cssWidth, cssHeight);
    }

    @Override
    public void reset() {
        this.superFactory.reset();
    }

    @Override
    public void remove(Element element) {
        this.superFactory.remove(element);
    }

    @Override
    public void setFormSubmissionListener(FormSubmissionListener formSubmissionListener) {
        this.superFactory.setFormSubmissionListener(formSubmissionListener);
    }

    private ReplacedElementKeys getMatchingKeys(Element element) {
        return elementKeys.stream().filter(keys -> keys.matches(element)).findFirst().orElse(null);
    }
}
