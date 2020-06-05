class MainGame extends egret.Sprite
{
    public bg:BG;
    public player:Player;
    public main:Main;//游戏控制指针

    public zm:ZDManager;    //多个子弹   
    public nm:NPCManager;
    public nzm:NZDManager;
    public t:number;        //子弹时间间隔
    public tm:TXManager;    
    public level:number;		//判断当前关卡序号
    public score:number;        //分数
    public st:egret.TextField;
	public constructor(main:Main) 
	{
		
		super();
		this.main=main;
        this.level =  0;

        this.bg = new BG(this);
        this.player = new Player(this);
        //              x,y, 速度，角度
        this.zm = new ZDManager(this);
        this.nm = new NPCManager(this);
        this.nzm = new NZDManager(this);
        this.tm = new TXManager(this);
        this.addChild(this.bg);
        this.addChild(this.nm);			//注意：nm要放在所有场景除背景外的最底层。
        this.addChild(this.zm);
        //因为是躲NPC子弹，所以放在玩家上面，可以很容易被看到。
        this.addChild(this.player);
        this.addChild(this.nzm);
        this.addChild(this.tm);
     
        this.score = 0 ;
        this.st = new egret.TextField();
        this.addChild(this.st);
        this.st.x = this.st.y = 50;
        this.st.size = 30;


        this.t = 0;

	}

	 public update()
    {
       this.bg.update();
       this.player.update();
       this.zm.update();
       this.nm.update();
       this.nzm.update();
       this.tm.update();

       this.score +=2;

       this.st.text = "分数"+this.score ;
    }

	 public touchDown(e:egret.TouchEvent)
    {
        this.player.touchDown(e);
    }
    public touchMove(e:egret.TouchEvent)
    {
         this.player.touchMove(e);
    }
    public touchUp(e:egret.TouchEvent)
    {
         this.player.touchUp(e);
    }


	public reset(level:number)
    {
        this.level = level;
        this.player.reset();
        this.bg.reset();
        this.nm.reset();
        this.nzm.reset();
    }
}