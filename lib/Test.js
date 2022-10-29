const root = document.getElementById("root");

class Test {
    static tests = [];

    static push(arg) {
        Test.tests.push(arg)
    }

    constructor(/**string*/name) {
        this.name = name;
        this.success = [];
        this.failed = [];
        this.commonStyles = [
            "color: white",
            "padding: 0 3px",
            "font-weight: bold",
            "display: inline-block",
            "width: 55px",
            "text-alight: center",
            "margin-right: 3px",
        ];

        this.styles = {
            fail: ["background: red"].concat(this.commonStyles).join(";"),
            success: ["background: green"].concat(this.commonStyles).join(";"),
        }

        for (const testResult of Test.tests) {
            this.add(testResult)
        }
    }

    add(/**boolean*/result) {
        result
            ? this.success.push(result)
            : this.failed.push(result);
    }

    printResult() {
        const htmlFactory = this._htmlFactory(),
            result = htmlFactory.testResult(),
            spanStatus = htmlFactory.testStatus(this.failed.length),
            spanText = htmlFactory.testName();

        result.appendChild(spanStatus);
        result.appendChild(spanText);
        root.appendChild(result);

    }

    _htmlFactory() {
        const self = this;

        return {
            testName: function () {
                const span = document.createElement("span");
                span.innerText = self.name;

                return span;
            },
            testStatus: function () {
                const span = document.createElement("span");

                if (self.failed.length) {
                    span.innerText = "FAIL:";
                    span.style.cssText += self.styles.fail;
                } else {
                    span.innerText = "PASS:";
                    span.style.cssText += self.styles.success;
                }

                return span;
            },
            testResult: function () {
                const div = document.createElement("div");
                div.style.cssText += "margin-bottom: 3px; padding-left: 15px";
                return div;
            },
        }
    }
}

export default Test;