let canvas = document.querySelector('#draw');
        let ctx = canvas.getContext('2d');
        const clearBtn = document.querySelector('.clear');

        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.8;
        canvas.style.border = "1px solid #e33";

        ctx.strokeStyle = "#BADA55";
        ctx.lineJoin = 'round';
        ctx.lineCap = "round";
        ctx.lineWidth = 100;

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let hue = 0;
        let direction = true;

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
            // update the lastX and lastY when moused down
        });


        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);

        clearBtn.addEventListener('click', clear);

        function draw(e) {
            if (!isDrawing) return // stop the fn from running when they are not moused down

            ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

            ctx.beginPath(); // start from
            ctx.moveTo(lastX, lastY); // go to

            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();

            [lastX, lastY] = [e.offsetX, e.offsetY];
            // update the lastX and lastY when drawing is finished
            hue++;
            if (hue >= 360) {
                hue = 0;

            }
            if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
                direction = !direction;
            }
            if (direction) {
                ctx.lineWidth++;
            } else {
                ctx.lineWidth--;
            }
        }

        function clear() {
            canvas = document.querySelector('#draw');
            ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
        }