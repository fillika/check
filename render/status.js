const styles = [
    "color: white",
    "padding: 0 3px",
    "font-weight: bold",
    "display: inline-block",
    "width: 55px",
    "text-alight: center",
    "margin-right: 3px",
];

function createSpanStatus(status) {
    const span = document.createElement("span");

    span.innerText = status ? "PASS:" : "FAIL:";
    span.style.cssText += [status ? "background: green" : "background: red"].concat(styles).join(";");

    return span;
}

export default createSpanStatus;