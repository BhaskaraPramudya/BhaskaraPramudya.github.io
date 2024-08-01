window.onload = function() {
    var iframe = document.getElementById("framez");

    // Add event listener to apply sandbox attributes once iframe loads
    iframe.addEventListener('load', function() {
        applySandbox();
    });

    function applySandbox() {
        var src = iframe.src;

        // Remove the existing sandbox attribute if any
        iframe.removeAttribute("sandbox");

        // Reload the iframe content
        iframe.contentWindow.location.href = src;

        // Apply the desired sandbox attributes
        iframe.sandbox = 'allow-scripts allow-forms allow-same-origin';
    }
}