//after all images load, game starts

window.addEventListener('load', function() { 
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d') //2d api with drawing methods/properties
    canvas.width = 800
    canvas.height = 720

    class InputHandler {
        constructor(){ //keep track of key presses
            this.keys = []
            window.addEventListener('keydown', function(e){
                console.log(e.key)
                if(e.key === 'ArrowDown'){
                    this.keys.push(e.key)
                }
                console.log(e.key, this.keys)
            })
        }

    }



    class Player {


    }



    class Background {


    }



    class Enemy {


    }



    function handleEnemies() {


    }



    function displayStatusText() {


    }

    const input = new InputHandler()



    function animate() {


    }
})