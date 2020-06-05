class MainOver extends egret.Sprite
 {

	public main:Main;//游戏控制指针
	public bg:egret.Bitmap;

  public ph:number[] = [];     //存入数值   
  public l:number = 50;        //记录的总名次
  public num:number;           //当前玩家的名次

  public st:egret.TextField;    
  public st2:egret.TextField;    

  public oy:number;           //上一次触笔位置
  public ny:number;           //当前触笔位置
  public vy:number;           //实际移动距离

  public isDown:boolean;      //是否存在触笔点击

	public constructor(main:Main) 
	{
      super();
      this.main=main;		
      this.bg = Main.createBitmapByName("gameBackground_jpg");
      this.addChild(this.bg);

      for(let i = 0 ; i < this.l ; i++){
        this.ph[i] = 0 ;
      }

   

        this.st = new egret.TextField();
        this.addChild(this.st);
        this.st.x = this.st.y = 50;
        this.st.size = 30;




        this.st2 = new egret.TextField();
        this.addChild(this.st2);
        this.st2.x = 200;
         this.st2.y = 500;
        this.st2.size = 30;

        let rect = new egret.Shape();
        this.addChild(rect);
        rect.graphics.beginFill(0xffffff);
        rect.graphics.drawRect(0 ,100,480,500);
        rect.graphics.endFill();
        // let im = Main.createBitmapByName("help_im_png");
        // this.addChild(im);

        this.st.mask = rect ;

        this.isDown = false;
        this.vy = 0;

	}


  public update()
    {        
    
      if(this.isDown == true){
        this.vy = this.ny - this.oy ; 
        this.oy = this.ny ;
        this.st.y +=this.vy;
      }else if(Math.abs(this.vy) > 0){      //惯性效果
        this.vy *=0.6;                  //速度逐渐变慢   0.6是阻尼值0~1之间
        this.st.y += this.vy;
        if(Math.abs(this.vy) < 1){
          this.vy = 0 ;
        }
      }
		 
    }



	public async touchDown(e:egret.TouchEvent)
  {      
    // this.main.removeChild(this);
    // this.main.game.reset(0);
    // this.main.addChild(this.main.game);
    // this.main.canvasIndex = 20;
    // this.main.game.score = 0 ;
    this.isDown = true;
    this.oy = this.ny = e.stageY;         //当前和上一次位置都等于触笔

  }
    public touchMove(e:egret.TouchEvent)
    {  
      this.ny = e.stageY;
     }
    public touchUp(e:egret.TouchEvent)
    {

      this.isDown = false;



	}
	public reset(){	      
      this.num = -1; 
      for(let i = 0 ; i < this.l ; i++ ){
        if(this.main.game.score >= this.ph[i]){
          //j是最后一个成绩
          for(let j = this.l - 1 ;j > i ; j-- ) {
              this.ph[j] = this.ph[j - 1];
           } 
         this.ph[i] = this.main.game.score;
         this.num = i;
         break;
        }
      }

      this.st.text="";
      for(let i = 0 ; i < this.l ; i++ ){
       this.st.text +="第"+(i+1)+"名 :"  +this.ph[i]+"\n";        //因为i是从0 开始 所以i+1;
      }
      this.st2.text = "我的成绩："+this.main.game.score+"";
	}

}