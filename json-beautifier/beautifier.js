// JSON Beautifier Service

class JSONBeautifier {
    constructor() {
        this.inputElement = document.getElementById('inputJson');
        this.outputElement = document.getElementById('outputJson');
        this.indentationSelect = document.getElementById('indentation');
        this.beautifyBtn = document.getElementById('beautifyBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.fileInput = document.getElementById('fileInput');
        this.messageElement = document.getElementById('message');

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.beautifyBtn.addEventListener('click', () => this.beautify());
        this.clearBtn.addEventListener('click', () => this.clear());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.downloadBtn.addEventListener('click', () => this.downloadJSON());
        this.fileInput.addEventListener('change', (e) => this.handleFileInput(e));
        this.inputElement.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                this.beautify();
            }
        });
    }

    getIndentation() {
        const value = this.indentationSelect.value;
        if (value === 'tab') {
            return '\t';
        }
        return ' '.repeat(parseInt(value));
    }

    beautify() {
        const input = this.inputElement.value.trim();

        if (!input) {
            this.showMessage('Please enter some JSON', 'error');
            this.outputElement.value = '';
            return;
        }

        try {
            // Parse the JSON string
            const parsed = JSON.parse(input);

            // Get the indentation setting
            const indent = this.getIndentation();

            // Stringify with formatting
            const beautified = JSON.stringify(parsed, null, indent);

            this.outputElement.value = beautified;
            this.showMessage('JSON beautified successfully!', 'success');
        } catch (error) {
            this.showMessage(`Invalid JSON: ${error.message}`, 'error');
            this.outputElement.value = '';
        }
    }

    clear() {
        this.inputElement.value = '';
        this.outputElement.value = '';
        this.messageElement.textContent = '';
        this.messageElement.className = 'message';
        this.inputElement.focus();
    }

    copyToClipboard() {
        const output = this.outputElement.value;

        if (!output) {
            this.showMessage('Nothing to copy', 'error');
            return;
        }

        navigator.clipboard.writeText(output)
            .then(() => {
                this.showMessage('Copied to clipboard!', 'success');
            })
            .catch(() => {
                this.showMessage('Failed to copy to clipboard', 'error');
            });
    }

    showMessage(text, type) {
        this.messageElement.textContent = text;
        this.messageElement.className = `message ${type}`;

        // Auto-clear success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.messageElement.textContent = '';
                this.messageElement.className = 'message';
            }, 3000);
        }
    }

    handleFileInput(event) {
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                this.inputElement.value = e.target.result;
                this.beautify();
                this.showMessage(`Loaded: ${file.name}`, 'success');
            } catch (error) {
                this.showMessage(`Error reading file: ${error.message}`, 'error');
            }
        };

        reader.onerror = () => {
            this.showMessage('Failed to read file', 'error');
        };

        reader.readAsText(file);
    }

    downloadJSON() {
        const output = this.outputElement.value;

        if (!output) {
            this.showMessage('Nothing to download', 'error');
            return;
        }

        // Create a blob from the output
        const blob = new Blob([output], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create a download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `formatted-${new Date().getTime()}.json`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);

        this.showMessage('Downloaded successfully!', 'success');
    }
}

// Initialize the beautifier when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new JSONBeautifier();
});