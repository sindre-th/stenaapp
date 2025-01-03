package no.stena.app.pdf;

import org.w3c.dom.Element;

public record ReplacedElementKeys(String targetNodeName, String targetClassName, String resourceName) {
    private final static String CLASS_NAME = "class";

    public boolean matches(Element element) {
        String nodeName = element.getNodeName();
        String className = element.getAttribute(CLASS_NAME);
        return this.targetNodeName.equals(nodeName) && this.targetClassName.equals(className);
    }
}
