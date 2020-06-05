class Main extends egret.DisplayObjectContainer {

  public game:MainGame;
  public menu:MainMenu;
  public over:MainOver;
  public canvasIndex:number;    //界面索引
/**
 * 界面索引 10菜单   20游戏 
 */
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {
            }
        })
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        this.runGame().catch(e => {
            console.log(e);
        })
    }
    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }
    public loadingView;
    private async loadResource() {
        try {
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("main", 0, this.loadingView);
            this.stage.removeChild(this.loadingView);
            this.loadingView = new LoadingUI2();
        }
        catch (e) {
            console.error(e);
        }
    }
    private textfield: egret.TextField;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private async createGameScene() 
    {
     //   var sound:egret.Sound = RES.getRes("mid_menu_mp3");
      //  sound.play();


        this.stage.addChild(this.loadingView);;
        await RES.loadGroup("menu", 0, this.loadingView);
        this.stage.removeChild(this.loadingView);

        this.menu=new MainMenu(this);
        this.game= null;
        this.over=new MainOver(this);

        this.addChild(this.menu);
        this.canvasIndex=10;

        this.touchEnabled=true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchDown,this);

        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchUp,this);


        let timer=new egret.Timer(50);
        timer.addEventListener(egret.TimerEvent.TIMER,this.update,this);
        timer.start();

    }
    public touchDown(e:egret.TouchEvent)
    {
        switch(this.canvasIndex)
        {
            case 10:
                this.menu.touchDown(e);
            break;
            case 20:
                this.game.touchDown(e);
            break;
            case 30:
                this.over.touchDown(e);
            break;
        }
        
    }
    public touchMove(e:egret.TouchEvent)
    {
       switch(this.canvasIndex)
        {
            case 10:
                this.menu.touchMove(e);
            break;
            case 20:
                this.game.touchMove(e);
            break;    
            case 30:
                this.over.touchMove(e);
            break;
        }
        
    }
    public touchUp(e:egret.TouchEvent)
    {
       switch(this.canvasIndex)
        {
            case 10:
                this.menu.touchUp(e);
            break;
            case 20:
                this.game.touchUp(e);
            break;
            case 30:
                this.over.touchUp(e);
            break;
        }
        
    }
    public update()
    {
        switch(this.canvasIndex)
        {
            case 10:
                this.menu.update();
            break;
            case 20:
                this.game.update();
            break;
            case 30:
                this.over.update();
            break;
        }
        
    }
    

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
    
}