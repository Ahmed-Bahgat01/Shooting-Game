window.addEventListener("load", function() {
    // console.log("hello");
    let templateMainMenu = this.document.querySelector(".templates .main-menu-template");
    let newMainMenu = templateMainMenu.content.cloneNode(true);
    this.document.querySelector("body").append(newMainMenu);

    // start game click
    let startGameButton = this.document.querySelector("button");
    startGameButton.onclick = function (event){
        document.querySelector(".main-menu").remove();
        
        // close the game
        // setTimeout(,)
    }
});