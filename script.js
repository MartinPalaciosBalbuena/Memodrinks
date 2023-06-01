let iconos = []
        let selecciones = []
        let temporizador = false;
        let timer = 0;
        let correcto = 0;
        let tiempoSucesivoId = null;
        let tiempodejuego = document.getElementById("tiempo");
        let fondo = document.querySelector("body");
        let cont = 0;
        let vercont = document.getElementById("movimientos");

        function cargarIconos() {
            iconos = [
                '<img class="img" src="img/BOMBAY BRAMBLE II.jpeg"/>',
                '<img class="img" src="img/BOMBAY BRAMBLE.png"/>',
                '<img class="img" src="img/BOMBAY LONDOY DRY II.jpeg"/>',
                '<img class="img" src="img/BOMBAY LONDOY DRY.png"/>',
                '<img class="img" src="img/BRIGHTON.jpeg"/>',
                '<img class="img" src="img/BROKERS.jpeg "/>',
                '<img class="img" src="img/BUENOS AIRES CAPORALE.jpeg"/>',
                '<img class="img" src="img/BUENOS AIRES COMTEMPORANEO.jpeg"/>',
                '<img class="img" src="img/BUENOS AIRES LONDON DRY.jpeg"/>',
                '<img class="img" src="img/MONKEY 47.webp"/>',
            ]
        }

        function generarTablero() {
            cargarIconos()
            selecciones = []
            let tablero = document.getElementById("tablero")
            let tarjetas = []
            timer = 0
            temporizador = false
            correcto = 0
            fondo.style.background = "black"
            fondo.style.transition = "6s"
            cont = 0
            vercont.innerHTML=`Movimientos: ${cont}`
           
            for (let i = 0; i < 20; i++) {
                tarjetas.push(`
                <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                    <div class="tarjeta" id="tarjeta${i}">
                        <div class="cara trasera" id="trasera${i}">
                            ${iconos[0]}
                        </div>
                        <div class="cara superior">
                            <img class="img-superior" src="img/copa.png"/>
                        </div>
                    </div>
                </div>        
                `)
                if (i % 2 == 1) {
                    iconos.splice(0, 1)
                }
            }
            tarjetas.sort(() => Math.random() - 0.5)
            tablero.innerHTML = tarjetas.join(" ")
        }

        function seleccionarTarjeta(i) {
            let tarjeta = document.getElementById("tarjeta" + i)
            if (tarjeta.style.transform != "rotateY(180deg)") {
                tarjeta.style.transform = "rotateY(180deg)"
                selecciones.push(i)
            }
            if (selecciones.length == 2) {
                deseleccionar(selecciones)
                selecciones = []
                cont++
                vercont.innerHTML=`Movimientos: ${cont}`
            }
            if (temporizador == false) {
                ContadorTime(selecciones);
                temporizador = true;
            }
        }
        
        function deseleccionar(selecciones) {
            setTimeout(() => {
                let trasera1 = document.getElementById("trasera" + selecciones[0])
                let trasera2 = document.getElementById("trasera" + selecciones[1])
                if (trasera1.innerHTML != trasera2.innerHTML) {
                    let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
                    let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
                    tarjeta1.style.transform = "rotateY(0deg)"
                    tarjeta2.style.transform = "rotateY(0deg)"
                }else{
                    trasera1.style.background = "plum"
                    trasera2.style.background = "plum"
                    correcto++
                }
            }, 1000);
        }
        function ContadorTime() {
            tiempoSucesivoId = setInterval(() => {
              timer++;
              tiempodejuego.innerHTML = `Tiempo: ${timer} ss`;
              if (correcto == cantidadTarjetas / 2) {
                clearInterval(tiempoSucesivoId);
              }
            }, 1000);
        }