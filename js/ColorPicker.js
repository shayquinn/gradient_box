class ColorPicker {
    constructor(containerId) {
        // Store the container element
        this.container = document.getElementById(containerId);

        // Initialize the color picker UI
        this.render();

        // Bind event listeners
        this.bindEvents();

        // Store the previous color
        this.previousColor = '#ff0000';
    }

    render() {
        // Create the color picker UI
        this.container.innerHTML = `
            <div id="colorPreview" style="background-color: #ff0000;"></div>
            <input type="text" id="colorInput" value="#ff0000" placeholder="#ff0000">
            <button id="confirmButton">OK</button>
            <button id="cancelButton">Cancel</button>
        `;

        // Store references to DOM elements
        this.colorPreview = this.container.querySelector('#colorPreview');
        this.colorInput = this.container.querySelector('#colorInput');
        this.confirmButton = this.container.querySelector('#confirmButton');
        this.cancelButton = this.container.querySelector('#cancelButton');
    }

    bindEvents() {
        // Update the color preview when the input changes
        this.colorInput.addEventListener('input', this.handleInput.bind(this));

        // Handle "OK" button click
        this.confirmButton.addEventListener('click', this.handleConfirm.bind(this));

        // Handle "Cancel" button click
        this.cancelButton.addEventListener('click', this.handleCancel.bind(this));
    }

    handleInput() {
        const newColor = this.colorInput.value;
        if (this.isValidColor(newColor)) {
            this.colorPreview.style.backgroundColor = newColor;
        }
    }

    handleConfirm() {
        const newColor = this.colorInput.value;
        if (this.isValidColor(newColor)) {
            console.log(`Color selected: ${newColor}`);
            this.previousColor = newColor;
        } else {
            console.log("Invalid color!");
        }
    }

    handleCancel() {
        this.colorInput.value = this.previousColor;
        this.colorPreview.style.backgroundColor = this.previousColor;
        console.log("Color picker closed without changes.");
    }

    isValidColor(color) {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    }

    destroy() {
        // Remove event listeners
        this.colorInput.removeEventListener('input', this.handleInput);
        this.confirmButton.removeEventListener('click', this.handleConfirm);
        this.cancelButton.removeEventListener('click', this.handleCancel);

        // Clear the container's content
        this.container.innerHTML = '';

        // Remove references to DOM elements
        this.colorPreview = null;
        this.colorInput = null;
        this.confirmButton = null;
        this.cancelButton = null;

        // Remove reference to the container
        this.container = null;

        console.log('ColorPicker destroyed.');
    }
}