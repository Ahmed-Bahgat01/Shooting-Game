class Bird{
    constructor(){
        this.name = null;
        this.score = null;
        this.htmlElemnt = null;
    }
}

class WhiteDuck extends Bird{
    constructor(){
        super();
        this.score = 10;
    }
}

class BrownDuck extends Bird{
    constructor(){
        super();
        this.score = 5;
    }
}

class RedSparrow extends Bird{
    constructor(){
        super();
        this.score = -10;
    }
}
