

export class GradientEditor {
    constructor(containerId, onCancel, onOk) {
        // Initialize properties
        this.colors = ['#ff0000', '#00ff00', '#0000ff']; // Red, Green, Blue
        this.colorStops = [0, 0.5, 1]; // Positions for the colors
        this.opacities = [1, 0.5, 0]; // Opacity values for the colors
        this.opacityStops = [0, 0.5, 1];
        this.markers = [0.15, 0.5, 0.85]; // Example markers between opacity stops
        this.gradientType = "linear"; // linear or radial
        this.angle = 90;
        this.selectedIndex = null;
        this.selectedType = null;
        this.radialCenter = null;
        this.deleteButton1Disabled = false;
        this.deleteButton2Disabled = false;

        // DOM elements
        this.container = document.getElementById(containerId);
        this.onCancel = onCancel;
        this.onOk = onOk;


        // Create and assign UI elements
        const ui = this.createGradientUI();

        // Assign created elements to class properties
        this.gradientContainer = ui.gradientContainer;
        this.topRail = ui.topRail;
        this.bottomRail = ui.bottomRail;
        this.opacityInput = ui.opacityInput;
        this.locationInput1 = ui.locationInput1;
        this.colorInput = ui.colorInput;
        this.locationInput2 = ui.locationInput2;
        this.deleteButton1 = ui.deleteButton1;
        this.deleteButton2 = ui.deleteButton2;
        this.typeSelect = ui.typeSelect;
        this.angleInput = ui.angleInput;
        this.okButton = ui.okButton;
        this.cancelButton = ui.cancelButton;

        // Initialize the gradient
        this.initialize();
    }

    createGradientUI() {
        // Outer gradient container
        const gradientOuter = document.createElement('div');
        gradientOuter.classList.add('gradient_outer_container');

        const topRail = document.createElement('div');
        topRail.classList.add('top_rail');
        topRail.id = 'top_railId';

        const gradientBack = document.createElement('div');
        gradientBack.classList.add('gradient_back');

        const gradientContainer = document.createElement('div');
        gradientContainer.id = 'gradientContainer';

        gradientBack.appendChild(gradientContainer);

        const bottomRail = document.createElement('div');
        bottomRail.classList.add('bottom_rail');
        bottomRail.id = 'bottom_railId';

        gradientOuter.appendChild(topRail);
        gradientOuter.appendChild(gradientBack);
        gradientOuter.appendChild(bottomRail);

        this.container.appendChild(gradientOuter);

        // Boxline Container
        const boxlineCon = document.createElement('div');
        boxlineCon.classList.add('boxlineCon');

        const con1 = document.createElement('div');
        con1.id = 'con1';

        const boxline1 = document.createElement('div');
        boxline1.classList.add('boxline');
        boxline1.id = 'boxline1';

        const labelOpacity = document.createElement('label');
        labelOpacity.classList.add('labelOpacity');
        labelOpacity.textContent = 'Opacity:';

        const opacityInput = document.createElement('input');
        opacityInput.classList.add('IN');
        opacityInput.type = 'number';
        opacityInput.id = 'OpacityNum';
        opacityInput.step = '0.05';
        opacityInput.min = '0';
        opacityInput.max = '1';
        opacityInput.value = '0.5';

        const labelLoc1 = document.createElement('label');
        labelLoc1.classList.add('locname');
        labelLoc1.textContent = 'Location:';

        const locationInput1 = document.createElement('input');
        locationInput1.classList.add('IN');
        locationInput1.type = 'number';
        locationInput1.id = 'LocationNum1';
        locationInput1.step = '0.05';
        locationInput1.min = '0';
        locationInput1.max = '1';
        locationInput1.value = '0.5';

        const deleteButton1 = document.createElement('button');
        deleteButton1.classList.add('IN');
        deleteButton1.textContent = 'Delete';

        boxline1.append(labelOpacity, opacityInput, labelLoc1, locationInput1, deleteButton1);
        con1.appendChild(boxline1);

        const boxline2 = document.createElement('div');
        boxline2.classList.add('boxline');
        boxline2.id = 'boxline2';

        const labelColor = document.createElement('label');
        labelColor.classList.add('labelColor');
        labelColor.textContent = 'Color:';

        const colorInput = document.createElement('input');
        colorInput.classList.add('IN');
        colorInput.type = 'color';
        colorInput.id = 'ColorNum';

        const labelLoc2 = document.createElement('label');
        labelLoc2.classList.add('locname');
        labelLoc2.textContent = 'Location:';

        const locationInput2 = document.createElement('input');
        locationInput2.classList.add('IN');
        locationInput2.type = 'number';
        locationInput2.id = 'LocationNum2';
        locationInput2.step = '0.05';
        locationInput2.min = '0';
        locationInput2.max = '1';
        locationInput2.value = '0.5';

        const deleteButton2 = document.createElement('button');
        deleteButton2.classList.add('IN');
        deleteButton2.textContent = 'Delete';

        boxline2.append(labelColor, colorInput, labelLoc2, locationInput2, deleteButton2);
        con1.appendChild(boxline2);

        const con2 = document.createElement('div');
        con2.id = 'con2';

        const boxline3 = document.createElement('div');
        boxline3.classList.add('boxline');

        const labelType = document.createElement('label');
        labelType.classList.add('labelType');
        labelType.textContent = 'Type:';

        const typeSelect = document.createElement('select');
        typeSelect.classList.add('IN');
        typeSelect.id = 'TypeSelect';

        const linearOption = document.createElement('option');
        linearOption.value = 'linear';
        linearOption.textContent = 'Linear';

        const radialOption = document.createElement('option');
        radialOption.value = 'radial';
        radialOption.textContent = 'Radial';

        typeSelect.append(linearOption, radialOption);

        const okButton = document.createElement('button');
        okButton.classList.add('IN');
        okButton.textContent = 'OK';




        boxline3.append(labelType, typeSelect, okButton);
        con2.appendChild(boxline3);

        const boxline4 = document.createElement('div');
        boxline4.classList.add('boxline');

        const labelAngle = document.createElement('label');
        labelAngle.textContent = 'Angle:';

        const angleInput = document.createElement('input');
        angleInput.classList.add('IN');
        angleInput.type = 'number';
        angleInput.id = 'AngleNum';
        angleInput.step = '1';
        angleInput.min = '0';
        angleInput.max = '360';
        angleInput.value = '90';

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('IN');
        cancelButton.textContent = 'Cancel';




        boxline4.append(labelAngle, angleInput, cancelButton);
        con2.appendChild(boxline4);

        boxlineCon.append(con1, con2);

        this.container.appendChild(boxlineCon);

        // Store references to the created elements
        return {
            gradientContainer,
            topRail,
            bottomRail,
            opacityInput,
            locationInput1,
            colorInput,
            locationInput2,
            deleteButton1,
            deleteButton2,
            typeSelect,
            angleInput,
            okButton,
            cancelButton
        };
    }

    getGradient() {
        const sortedData = this.sortStops();
        const colorGradient = this.generateGradientString(sortedData.colors, sortedData.colorStops);
        const opacityGradient = this.generateOpacityGradientString(sortedData.opacities, sortedData.opacityStops);
        const Containerfront = document.getElementById('Containerfront');
        Containerfront.style.background = colorGradient
        Containerfront.style.webkitMaskImage = opacityGradient;
        Containerfront.style.maskImage = opacityGradient;
    }



    initialize() {
        // Set up event listeners
        this.setupEventListeners();

        // Render the initial gradient and slider tags
        this.renderSliderTags();
        this.update();

        this.disableElements('#boxline1', true);
        this.disableElements('#boxline2', true);
    }

    setupEventListeners() {
        // Gradient container click for radial center
        this.gradientContainer.addEventListener('click', (event) => {
            const rect = this.gradientContainer.getBoundingClientRect();
            const clickPosition = (event.clientX - rect.left) / rect.width * 100;
            this.radialCenter = clickPosition;
            this.update();
        });

        // Bottom rail click for adding color stops
        this.bottomRail.addEventListener('click', (event) => {
            if (event.target.classList.contains('slider-tag')) {
                return; // Do nothing if a tag is clicked
            }
            if (this.colorStops.length < 26) {
                const rect = this.bottomRail.getBoundingClientRect();
                const clickPosition = (event.clientX - rect.left) / rect.width * 100;
                this.addColorStop(clickPosition);
            }

        });

        // Top rail click for adding opacity stops
        this.topRail.addEventListener('click', (event) => {
            if (event.target.classList.contains('slider-tag')) {
                return; // Do nothing if a tag is clicked
            }
            if (this.opacityStops.length < 26) {
                const rect = this.topRail.getBoundingClientRect();
                const clickPosition = (event.clientX - rect.left) / rect.width * 100;
                this.addOpacityStop(clickPosition);
            }
        });

        // Input event listeners
        this.opacityInput.addEventListener('input', () => {
            this.opacities[this.selectedIndex] = parseFloat(this.opacityInput.value);
            this.renderSliderTags();
            this.update();
        });

        this.locationInput1.addEventListener('input', () => {
            this.opacityStops[this.selectedIndex] = parseFloat(this.locationInput1.value);
            this.renderSliderTags();
            this.update();
        });

        this.colorInput.addEventListener('input', () => {
            this.colors[this.selectedIndex] = this.colorInput.value;
            this.renderSliderTags();
            this.update();
        });

        this.locationInput2.addEventListener('input', () => {
            this.colorStops[this.selectedIndex] = parseFloat(this.locationInput2.value);
            this.renderSliderTags();
            this.update();
        });

        // Delete buttons
        this.deleteButton1.addEventListener('click', () => this.deleteOpacityStop());
        this.deleteButton2.addEventListener('click', () => this.deleteColorStop());

        // Gradient type and angle
        this.typeSelect.addEventListener('change', () => {
            this.gradientType = this.typeSelect.value;
            this.angleInput.disabled = this.gradientType === 'radial';
            this.update();
        });

        this.angleInput.addEventListener('input', () => {
            this.angle = parseFloat(this.angleInput.value);
            this.update();
        });

        this.okButton.addEventListener('click', () => {
            console.log('okButton');
            this.getGradient();
            this.onCancel();
        });

        this.cancelButton.addEventListener('click', () => {
            console.log('cancelButton');
            const Containerfront = document.getElementById('Containerfront');
            Containerfront.style.background = 'none';
            Containerfront.style.webkitMaskImage = 'none';
            Containerfront.style.maskImage = 'none';
            this.onCancel();
        });
    }

    update() {
        const sortedData = this.sortStops();
        const colorGradient = this.generateGradientString(sortedData.colors, sortedData.colorStops);
        const opacityGradient = this.generateOpacityGradientString(sortedData.opacities, sortedData.opacityStops);
        this.combineGradients(colorGradient, opacityGradient);
    }

    sortStops() {
        const stops = this.colorStops.map((stop, index) => ({ stop, color: this.colors[index] }));
        const opacityEntries = this.opacityStops.map((stop, index) => ({ stop, opacity: this.opacities[index] }));

        stops.sort((a, b) => a.stop - b.stop);
        opacityEntries.sort((a, b) => a.stop - b.stop);

        return {
            colors: stops.map(s => s.color),
            colorStops: stops.map(s => s.stop),
            opacities: opacityEntries.map(s => s.opacity),
            opacityStops: opacityEntries.map(s => s.stop),
        };
    }

    generateGradientString(colors, colorStops) {
        const stops = colors.map((color, index) => `${color} ${colorStops[index] * 100}%`).join(', ');
        if (this.gradientType === 'radial') {
            const position = this.radialCenter !== null ? `${this.radialCenter}%` : 'center';
            return `radial-gradient(circle at ${position}, ${stops})`;
        } else {
            return `linear-gradient(${this.angle}deg, ${stops})`;
        }
    }

    generateOpacityGradientString(opacities, opacityStops) {
        const stops = opacities
            .map((opacity, index) => `rgba(0,0,0,${opacity}) ${opacityStops[index] * 100}%`)
            .join(', ');
        if (this.gradientType === 'radial') {
            const position = this.radialCenter !== null ? `${this.radialCenter}%` : 'center';
            return `radial-gradient(circle at ${position}, ${stops})`;
        } else {
            return `linear-gradient(${this.angle}deg, ${stops})`;
        }
    }


    combineGradients(colorGradient, opacityGradient) {
        this.gradientContainer.style.background = colorGradient;
        this.gradientContainer.style.webkitMaskImage = opacityGradient;
        this.gradientContainer.style.maskImage = opacityGradient;
    }

    renderSliderTags() {
        this.topRail.innerHTML = '';
        this.bottomRail.innerHTML = '';

        this.markers = this.calculateMarkers();

        this.opacityStops.forEach((stop, index) => {
            const sliderTag = document.createElement('div');
            sliderTag.classList.add('slider-tag', 'top');
            sliderTag.style.left = `${stop * 100}%`;
            sliderTag.style.transform = 'translateX(-50%)';
            sliderTag.dataset.index = index;
            this.topRail.appendChild(sliderTag);
            this.makeDraggable(sliderTag, 'opacity', index);
        });

        this.markers.forEach((markerPosition) => {
            const marker = document.createElement('div');
            marker.classList.add('slider-marker');
            marker.style.left = `${markerPosition * 100}%`;
            marker.style.transform = 'translateX(-50%)';
            this.topRail.appendChild(marker);
        });

        this.colors.forEach((color, index) => {
            const sliderTag = document.createElement('div');
            sliderTag.classList.add('slider-tag', 'bottom');
            sliderTag.style.left = `${this.colorStops[index] * 100}%`;
            sliderTag.style.transform = 'translateX(-50%)';
            sliderTag.style.backgroundColor = color;
            sliderTag.dataset.index = index;
            this.bottomRail.appendChild(sliderTag);
            this.makeDraggable(sliderTag, 'color', index);
        });

        this.deleteButton1.disabled = this.opacityStops.length <= 2;
        this.deleteButton2.disabled = this.colorStops.length <= 2;
    }

    calculateMarkers() {
        const sortedStops = [...this.opacityStops].sort((a, b) => a - b);
        const markers = [];
        if (sortedStops.length > 1) {
            for (let i = 0; i < sortedStops.length - 1; i++) {
                const midpoint = (sortedStops[i] + sortedStops[i + 1]) / 2;
                markers.push(midpoint);
            }
        }
        return markers;
    }

    makeDraggable(tag, type, index) {

        tag.addEventListener('click', () => {
            this.selectedIndex = index;
            this.selectedType = type;
            this.updateTagPosition();
        });

        tag.addEventListener('mousedown', (e) => {
            console.log('makeDraggable');
            this.selectedIndex = index;
            this.selectedType = type;
            e.preventDefault();

            const startX = e.clientX;
            const startLeft = parseFloat(tag.style.left);
            const rail = type === 'opacity' ? this.topRail : this.bottomRail;



            const onMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                const newLeft = Math.min(Math.max(startLeft + (deltaX / rail.clientWidth) * 100, 0), 100);
                const position = newLeft / 100;
                this.updateTagPosition(position);
                this.update();
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    updateTagPosition(position = undefined) {
        console.log('updateTagPosition');
        const index = this.selectedIndex;
        const type = this.selectedType;
        const tag = type === 'opacity' ? this.topRail.querySelector(`.slider-tag[data-index="${index}"]`) : this.bottomRail.querySelector(`.slider-tag[data-index="${index}"]`);

        if (!tag) return;

        if (position === undefined) {
            const left = parseFloat(tag.style.left);
            position = left / 100;
        }

        if (type === 'opacity') {
            this.disableElements('#boxline1', false);
            this.disableElements('#boxline2', true);
            this.opacityStops[index] = position;
            this.locationInput1.value = position;
        } else if (type === 'color') {
            this.disableElements('#boxline1', true);
            this.disableElements('#boxline2', false);
            this.colorStops[index] = position;
            this.locationInput2.value = position;
            this.colorInput.value = this.colors[index];
        }

        tag.style.left = `${position * 100}%`;
        tag.style.transform = 'translateX(-50%)';
    }

    disableElements(selector, disable) {
        const container = this.container.querySelector(selector);
        if (container) {
            const elements = container.querySelectorAll('input, button, select, textarea');
            elements.forEach(element => {
                element.disabled = disable;
            });
            container.style.backgroundColor = disable ? 'lightgray' : 'white';
        }
    }



    addColorStop(clickPosition) {
        const position = clickPosition / 100;
        let index = 0;
        while (index < this.colorStops.length && this.colorStops[index] < position) {
            index++;
        }
        this.colorStops.splice(index, 0, position);
        this.colors.splice(index, 0, '#000000');
        this.selectedIndex = index;
        this.selectedType = 'color';
        this.colorInput.value = '#000000';
        this.disableElements('#boxline1', true);
        this.disableElements('#boxline2', false);
        this.colorStops[index] = position;
        this.locationInput2.value = position;
        this.renderSliderTags();
        this.update();

        // Use a slight delay to ensure the DOM is updated before triggering the click event
        setTimeout(() => {
            this.colorInput.click();
        }, 0);
    }

    addOpacityStop(clickPosition) {
        const position = clickPosition / 100;
        let index = 0;
        while (index < this.opacityStops.length && this.opacityStops[index] < position) {
            index++;
        }
        this.opacityStops.splice(index, 0, position);
        this.opacities.splice(index, 0, 0.5);
        this.selectedIndex = index;
        this.selectedType = 'opacity';
        this.opacityInput.value = 0.5;
        this.locationInput1.value = position;
        this.disableElements('#boxline1', false);
        this.disableElements('#boxline2', true);
        this.locationInput2.value = position;
        this.renderSliderTags();
        this.update();
    }

    deleteColorStop() {
        if (this.colorStops.length > 2) {
            this.colorStops.splice(this.selectedIndex, 1);
            this.colors.splice(this.selectedIndex, 1);
            this.selectedIndex = null;
            this.selectedType = null;
            this.renderSliderTags();
            this.update();
        }
    }

    deleteOpacityStop() {
        if (this.opacityStops.length > 2) {
            this.opacityStops.splice(this.selectedIndex, 1);
            this.opacities.splice(this.selectedIndex, 1);
            this.selectedIndex = null;
            this.selectedType = null;
            this.renderSliderTags();
            this.update();
        }
    }
}


export function createDialogBox(containerId, location = { top: '50%', left: '50%' }) {
    const uniqueId = new Date().getTime();
    const div = document.createElement('div');
    div.className = 'dialog-box';
    div.id = 'dialog-box-' + uniqueId;

    // Create dialog header
    const dialogHeader = document.createElement('div');
    dialogHeader.className = 'dialog-header';

    // Create dialog title
    const dialogTitle = document.createElement('h3');
    dialogTitle.className = 'dialog-title';
    dialogTitle.textContent = 'Gradient Editor';

    // Create close button
    const dialogClose = document.createElement('a');
    dialogClose.href = '#';
    dialogClose.className = 'dialog-close';
    dialogClose.title = 'Close';
    dialogClose.innerHTML = '&times;';

    // Append title and close button to header
    dialogHeader.appendChild(dialogTitle);
    dialogHeader.appendChild(dialogClose);

    // Create dialog content
    const dialogContent = document.createElement('div');
    dialogContent.className = 'dialog-content';

    // Append header and content to dialog
    div.appendChild(dialogHeader);
    div.appendChild(dialogContent);

    // Append dialog to the specified container
    const container = document.getElementById(containerId);
    container.appendChild(div);

    const dialog = document.getElementById('dialog-box-' + uniqueId);
    const gradientEditorContainer = document.createElement('div');
    gradientEditorContainer.id = 'gradientEditorContainer';
    dialogContent.appendChild(gradientEditorContainer);

    // Set default size
    dialog.style.width = '570px';
    dialog.style.height = 'auto';

    // Position the dialog
    dialog.style.position = 'absolute';
    dialog.style.top = location.top;
    dialog.style.left = location.left;
    dialog.style.transform = 'translate(-50%, -50%)';

    const gradientEditor = new GradientEditor('gradientEditorContainer', () => {
        container.removeChild(dialog);
        return null;
    }, (gradient) => {
        container.removeChild(dialog);
        return gradient;
    });

    dialogClose.addEventListener('click', (e) => {
        e.preventDefault();
        container.removeChild(dialog);
        return null;
    });

    // Make the dialog draggable
    let isDragging = false;
    let initialX, initialY;
    let startPosX, startPosY;

    dialogHeader.addEventListener('mousedown', (e) => {
        e.preventDefault();

        isDragging = true;

        // Store the initial mouse position
        initialX = e.clientX;
        initialY = e.clientY;

        // Store the initial dialog position
        const computedStyle = window.getComputedStyle(dialog);
        startPosX = parseInt(computedStyle.left, 10);
        startPosY = parseInt(computedStyle.top, 10);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        // Calculate the new position based on mouse movement
        const dx = e.clientX - initialX;
        const dy = e.clientY - initialY;

        // Apply the new position
        dialog.style.left = `${startPosX + dx}px`;
        dialog.style.top = `${startPosY + dy}px`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}