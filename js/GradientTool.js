




   


        // Local variables for colors, color stops, opacity stops, and markers
        var colors = ['#ff0000', '#00ff00', '#0000ff']; // Red, Green, Blue
        var color_stop = [0, 0.5, 1]; // Positions for the colors
        var opacity = [1, 0.5, 0]; // Opacity values for the colors
        var opacity_stop = [0, 0.5, 1];
        var markers = [0.15, 0.5, 0.85]; // Example markers between opacity stops
        var gradient_type = "linear"; //linear  radial
        var angle = 90;

        var selected_index = null;
        var selected_type = null;

        var radialCenter = null;

        var deleteButton1_bull = false;
        var deleteButton2_bull = false;


        const gradientContainer = document.getElementById('gradientContainer');

        // Create an off-screen canvas
        const offScreenCanvas = document.createElement('canvas');
        const offScreenCtx = offScreenCanvas.getContext('2d');


        disableElements('#boxline1', true);
        disableElements('#boxline2', true);

        // Function to resize the off-screen canvas
        function resizeOffScreenCanvas() {
            offScreenCanvas.width = gradientContainer.clientWidth;
            offScreenCanvas.height = gradientContainer.clientHeight;
        }

        function update() {
            // Sort the stops
            const sortedData = sortStops(colors, color_stop, opacity, opacity_stop);
            const colorGradient = generateGradientString(sortedData.colors, sortedData.colorStops, gradient_type, angle);
            const opacityGradient = generateOpacityGradientString(sortedData.opacities, sortedData.opacityStops, gradient_type, angle);
            var combinedGradient = combineGradients(gradientContainer, colorGradient, opacityGradient);



        }

        function sortStops(colors, colorStops, opacities, opacityStops) {
            // Create an array of objects for colors and opacity, keeping track of positions
            let stops = colorStops.map((stop, index) => ({
                stop,
                color: colors[index],
            }));

            let opacityEntries = opacityStops.map((stop, index) => ({
                stop,
                opacity: opacities[index],
            }));

            // Sort both arrays by their respective stop values
            stops.sort((a, b) => a.stop - b.stop);
            opacityEntries.sort((a, b) => a.stop - b.stop);

            // Extract the sorted values back into separate arrays
            return {
                colors: stops.map(s => s.color),
                colorStops: stops.map(s => s.stop),
                opacities: opacityEntries.map(s => s.opacity),
                opacityStops: opacityEntries.map(s => s.stop)
            };
        }




        function generateGradientString(colors, colorStops, gradientType, angle) {
            let stops = colors.map((color, index) => `${color} ${colorStops[index] * 100}%`).join(', ');

            if (gradientType === 'radial') {
                // Radial gradient uses the radialCenter if it's not null
                const position = radialCenter !== null ? `${radialCenter}%` : 'center';
                return `radial-gradient(circle at ${position}, ${stops})`;
            } else {
                // Linear gradient uses an angle
                return `${gradientType}-gradient(${angle}deg, ${stops})`;
            }
        }

        function generateOpacityGradientString(opacities, colorStops, gradientType, angle) {
            let stops = opacities
                .map((opacity, index) => `rgba(0,0,0,${opacity}) ${colorStops[index] * 100}%`)
                .join(", ");

            if (gradientType === 'radial') {
                // Radial gradient uses the radialCenter if it's not null
                const position = radialCenter !== null ? `${radialCenter}%` : 'center';
                return `radial-gradient(circle at ${position}, ${stops})`;
            } else {
                // Linear gradient for opacity (uses angle)
                return `${gradientType}-gradient(${angle}deg, ${stops})`;
            }
        }


        // Initialize the off-screen canvas on page load
        window.addEventListener('load', () => {
            resizeOffScreenCanvas();
            renderSliderTags();
            update()
        });

        // Resize the off-screen canvas on window resize
        window.addEventListener('resize', resizeOffScreenCanvas);




        function combineGradients(element, colorGradientString, opacityGradientString) {
            element.style.background = colorGradientString;
            element.style.webkitMaskImage = opacityGradientString;
            element.style.maskImage = opacityGradientString;
        }


        // Helper function to convert hex to opacity value (0-1)
        function getValueFromHex(hex) {
            if (!/^#([0-9a-fA-F]{6})$/.test(hex)) {
                throw new Error('Invalid hex color');
            }

            // Extract the RGB values
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);

            // Since the color is between black and white, the RGB values should be equal
            if (r !== g || g !== b) {
                throw new Error('Hex color is not between black and white');
            }

            // Calculate the value between 0 and 1
            const value = r / 255;

            return value;
        }

        // Function to convert a value (0-1) to a hex color
        function getHexFromValue(value) {
            // Ensure the value is between 0 and 1
            value = Math.max(0, Math.min(1, value));

            // Calculate the RGB values
            const rgbValue = Math.round(value * 255);
            const hexValue = rgbValue.toString(16).padStart(2, '0');

            // Return the hex color
            return `#${hexValue}${hexValue}${hexValue}`;
        }

        // Function to render slider tags
        function renderSliderTags() {
            const top_rail = document.getElementById('top_railId');
            const bottom_rail = document.getElementById('bottom_railId');

            // Clear existing slider tags and markers
            top_rail.innerHTML = '';
            bottom_rail.innerHTML = '';

            // Calculate marker positions
            markers = calculateMarkers(opacity_stop);

            // Render opacity stops (top)
            opacity_stop.forEach((o_stop, index) => {
                const sliderTag = document.createElement('div');
                sliderTag.classList.add('slider-tag', 'top');
                sliderTag.style.left = `${o_stop * 100}%`;
                sliderTag.style.transform = 'translateX(-50%)'; // Center the tag
                sliderTag.dataset.index = index;
                top_rail.appendChild(sliderTag);
                makeDraggable(sliderTag, 'opacity', index);
            });

            // Render markers (small indicators between opacity stops)
            markers.forEach((markerPosition, index) => {
                const marker = document.createElement('div');
                marker.classList.add('slider-marker');
                marker.style.left = `${markerPosition * 100}%`;
                marker.style.transform = 'translateX(-50%)'; // Center the marker
                top_rail.appendChild(marker);
            });

            // Render color stops (bottom)
            colors.forEach((color, index) => {
                const sliderTag = document.createElement('div');
                sliderTag.classList.add('slider-tag', 'bottom');
                sliderTag.style.left = `${color_stop[index] * 100}%`;
                sliderTag.style.transform = 'translateX(-50%)'; // Center the tag
                sliderTag.style.backgroundColor = color;
                sliderTag.dataset.index = index;
                bottom_rail.appendChild(sliderTag);
                makeDraggable(sliderTag, 'color', index);
            });

            if (color_stop.length === 2) {
                deleteButton2_bull = true;
            } else {
                deleteButton2_bull = false;
            }

            if (opacity_stop.length === 2) {
                deleteButton1_bull = true;
            } else {
                deleteButton1_bull = false;
            }

        }





        // Function to calculate marker positions
        function calculateMarkers(opacityStops) {
            const markers = [];

            // Ensure opacity stops are sorted before processing
            const sortedStops = [...opacityStops].sort((a, b) => a - b);

            if (sortedStops.length > 1) {
                for (let i = 0; i < sortedStops.length - 1; i++) {
                    const start = sortedStops[i];
                    const end = sortedStops[i + 1];
                    const midpoint = (start + end) / 2; // Calculate midpoint
                    markers.push(midpoint);
                }
            }
            return markers;
        }

        // Function to make slider tags draggable
        function makeDraggable(tag, type, index) {
            tag.addEventListener('click', () => {
                selected_index = index;
                selected_type = type;
                renderSliderTags();
            });

            tag.addEventListener('mousedown', (e) => {
                selected_index = index;
                selected_type = type;
                e.preventDefault();
                renderSliderTags();

                const startX = e.clientX;
                const startLeft = parseFloat(tag.style.left);

                // Determine the rail (top or bottom) based on the type
                const rail = type === 'opacity' ? document.getElementById('top_railId') : document.getElementById('bottom_railId');

                if (type === 'opacity') {
                    disableElements('#boxline1', false);
                    disableElements('#boxline2', true);
                    document.getElementById('OpacityNum').value = opacity[index];
                    document.getElementById('LocationNum1').value = opacity_stop[index];
                } else if (type === 'color') {
                    disableElements('#boxline1', true);
                    disableElements('#boxline2', false);
                    document.getElementById('ColorNum').value = colors[index];
                    document.getElementById('LocationNum2').value = color_stop[index];
                }

                function onMouseMove(e) {
                    const deltaX = e.clientX - startX;
                    const newLeft = Math.min(Math.max(startLeft + (deltaX / rail.clientWidth) * 100, 0), 100);
                    const position = newLeft / 100;

                    if (type === 'opacity') {
                        opacity_stop[index] = position;
                        document.getElementById('LocationNum1').value = position;
                    } else if (type === 'color') {
                        color_stop[index] = position;
                        document.getElementById('LocationNum2').value = position;
                    }

                    renderSliderTags();
                    update();
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        }

        // Function to disable/enable elements
        function disableElements(idText, type) {
            const boxlineCon = document.querySelector(idText);
            boxlineCon.style.backgroundColor = type ? 'lightgray' : 'white';
            const elements = boxlineCon.querySelectorAll('input, button, select, textarea');
            elements.forEach(element => {
                element.disabled = type;
            });
        }



        const GC = document.getElementById('gradientContainer');

        GC.addEventListener('click', (event) => {
            const rect = GC.getBoundingClientRect();
            const clickPosition = (event.clientX - rect.left) / rect.width * 100;
            radialCenter = clickPosition;
            update();
        });



        const bottom_rail = document.getElementById('bottom_railId');

        bottom_rail.addEventListener('click', (event) => {
            const rect = bottom_rail.getBoundingClientRect();
            const clickPosition = (event.clientX - rect.left) / rect.width * 100;
            addColorStop(clickPosition);
        });

        function addColorStop(clickPosition) {
            const position = clickPosition / 100;
            let index = 0;
            while (index < color_stop.length && color_stop[index] < position) {
                index++;
            }
            color_stop.splice(index, 0, position);
            colors.splice(index, 0, '#000000'); // Default color value

            // Set the selected index and type
            selected_index = index;
            selected_type = 'color';

            // Open the ColorNum color picker
            const colorInput = document.getElementById('ColorNum');
            colorInput.value = '#000000'; // Set the default color value
            colorInput.click();

            disableElements('#boxline1', true);
            disableElements('#boxline2', false);
            document.getElementById('ColorNum').value = colors[index];
            document.getElementById('LocationNum2').value = color_stop[index];

            renderSliderTags();
            update();
        }


        const top_rail = document.getElementById('top_railId');

        // Add a click listener to the top_rail element
        top_rail.addEventListener('click', (event) => {
            // Get the bounding rectangle of the top_rail element
            const rect = top_rail.getBoundingClientRect();
            // Calculate the click position as a percentage of the width
            const clickPosition = (event.clientX - rect.left) / rect.width * 100;
            // Add a new opacity stop at the click position
            addOpacityStop(clickPosition);
        });

        function addOpacityStop(clickPosition) {
            // Convert the click position percentage to a value between 0 and 1
            const position = clickPosition / 100;
            // Find the correct index to insert the new stop
            let index = 0;
            while (index < opacity_stop.length && opacity_stop[index] < position) {
                index++;
            }
            // Insert the new stop and its corresponding opacity value
            opacity_stop.splice(index, 0, position);
            opacity.splice(index, 0, 0.5); // Default opacity value
            // Re-render the slider tags and update the gradient

            selected_index = index;
            selected_type = 'opacity';
            disableElements('#boxline1', false);
            disableElements('#boxline2', true);
            document.getElementById('OpacityNum').value = opacity[index];
            document.getElementById('LocationNum1').value = opacity_stop[index];
            renderSliderTags();
            update();
        }


        const opacityInput = document.getElementById('OpacityNum');
        const locationInput1 = document.getElementById('LocationNum1');
        const colorInput = document.getElementById('ColorNum');
        const locationInput2 = document.getElementById('LocationNum2');
        const deleteButton1 = document.querySelector('#boxline1 button');
        const deleteButton2 = document.querySelector('#boxline2 button');

        const typeInput = document.getElementById('TypeSelect');
        const angleInput = document.getElementById('AngleNum');



        typeInput.addEventListener('change', () => {
            gradient_type = typeInput.value;
            if (gradient_type === 'radial') {
                angleInput.disabled = true;
            } else {
                angleInput.disabled = false;
                radialCenter = null;
            }
            update();
        });


        angleInput.addEventListener('input', () => {
            angle = parseFloat(angleInput.value);
            update();
        });




        // Add event listeners for opacity and location inputs (boxline1)
        opacityInput.addEventListener('input', () => {
            opacity[selected_index] = parseFloat(opacityInput.value);
            renderSliderTags();
            update();
        });

        locationInput1.addEventListener('input', () => {
            opacity_stop[selected_index] = parseFloat(locationInput1.value);
            renderSliderTags();
            update();
        });

        // Add event listeners for color and location inputs (boxline2)
        colorInput.addEventListener('input', () => {
            const colorValue = colorInput.value;
            colors[selected_index] = colorValue;
            renderSliderTags();
            update();
        });

        locationInput2.addEventListener('input', () => {
            color_stop[selected_index] = parseFloat(locationInput2.value);
            renderSliderTags();
            update();
        });

        // Add event listeners for delete buttons
        deleteButton1.addEventListener('click', () => {
            // Delete the corresponding opacity stop
            deleteOpacityStop();
        });

        deleteButton2.addEventListener('click', () => {
            // Delete the corresponding color stop
            deleteColorStop();
        });

        function deleteColorStop() {
            // Ensure there is at least one color stop
            if (color_stop.length > 2) {
                deleteButton1_bull = false;
                // Remove the stop and color value at the selected index
                color_stop.splice(selected_index, 1);
                colors.splice(selected_index, 1);
                // Reset the selected index and type
                selected_index = null;
                selected_type = null;
                // Re-render the slider tags and update the gradient
                renderSliderTags();
                update();
            } else {
                deleteButton1_bull = true;
            }
        }



        function deleteOpacityStop() {
            // Ensure there is at least one opacity stop
            if (opacity_stop.length > 2) {
                // Remove the stop and opacity value at the selected index
                opacity_stop.splice(selected_index, 1);
                opacity.splice(selected_index, 1);
                // Reset the selected index and type
                selected_index = null;
                selected_type = null;
                // Re-render the slider tags and update the gradient
                renderSliderTags();
                update();
            }
        }

        // Function to initialize the gradient
        function initializeGradient() {
            renderSliderTags();
        }

        // Initialize on page load
        initializeGradient();


