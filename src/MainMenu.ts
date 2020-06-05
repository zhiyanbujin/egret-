class MainMenu extends egret.Sprite
{
  public bg:egret.Bitmap;

	public main:Main;//游戏控制指针
  public but:egret.Bitmap; //按钮
  public na:egret.Bitmap;   //name
  public fight:egret.Bitmap;  //fight
  public im:egret.Bitmap;
  public m:number;
  public t:number;
  public voice:egret.Bitmap;  //按钮3 声音    

	public constructor(main:Main) 
	{
      super();
      this.main=main;		
      this.bg = Main.createBitmapByName("gameBackground_jpg");
      this.addChild(this.bg);

    //fight
      this.fight=Main.createBitmapByName("sl_img_png");
      this.addChild(this.fight);
      this.fight.anchorOffsetX=this.fight.width/2;    
      this.fight.anchorOffsetY=this.fight.height/2;
      this.fight.x=240;
      this.fight.y=50; 
      //name
      this.na=Main.createBitmapByName("sl_name_png");
      this.addChild(this.na);
      this.na.anchorOffsetX=this.na.width/2;    
      this.na.anchorOffsetY=this.na.height/2;
      this.na.x=240;
      this.na.y=100; 
      //开始游戏按钮
      this.but=Main.createBitmapByName("btn_start_png");
      this.addChild(this.but);
      this.but.anchorOffsetX=this.but.width/2;    
      this.but.anchorOffsetY=this.but.height/2;
      this.but.x=240;
      this.but.y=680; 

      //声音
      this.voice=Main.createBitmapByName("btn_sound_on2_png");
      this.addChild(this.voice);
      this.voice.anchorOffsetX=this.voice.width/2;    
      this.voice.anchorOffsetY=this.voice.height/2;
      this.voice.x=50;
      this.voice.y=750; 

      this.reset();
  }
  	public reset(){	       

      this.m = 0;  
      this.t = 0;

      this.na.y = -240;
      this.fight.y = -440;
	}
    public update()
    {        
      switch(this.m)
        {
            case 0:
                this.t++;
                 //    this.na.y = - 700 + 840 * this.t /6;
                this.fight.y = - 250 + 300 * this.t /6;
                this.na.y = - 160 + 300 * this.t /6;
                if(this.t >=6)
                {
                    this.t = 0;
                    this.m = 10;
                }
            break;
                case 10:
               
                break;
             //离场动画
            case 20:  
                this.t++;
                 //  this.but.scaleY = this.but.scaleX = 1 -  1 *this.t/5;
                //   this.na.scaleY = this.na.scaleX =1 - 1*this.t/5;
                this.fight.y =200 - 800 * this.t / 5;
                this.na.y = 220 - 800 * this.t / 5;
                
                if(this.t >= 5)
                {    
   
                    // }
                    this.main.removeChild(this);//把自身移出去
                    this.main.game.reset(0);    // 0 是关卡
                    this.main.addChild(this.main.game);//吧game添加进来
                    this.main.canvasIndex=20;
 
                }
                break;

        }  

		 
    }
	public async touchDown(e:egret.TouchEvent)
  {      
        //  if(this.m ==10)
        //  {
        //      if(Math.abs(this.x-this.but.x)<150 && Math.abs(this.y-this.but.y)<150)
        //     {
        //         this. m =20;
        //         this. t = 0; 
        //     }
        //  }
      if(this.main.game == null){         //等于空说明没有构造，资源没有加载，所以才加载界面
        //把loading界面加载到场景中
        this.stage.addChild(this.main.loadingView);
        //读取资源
        await RES.loadGroup("game", 0, this.main.loadingView); 
        //移除界面
        this.stage.removeChild(this.main.loadingView);
        //加载完成再去构造game界面
        this.main.game = new MainGame(this.main);
      }
      this.main.removeChild(this);
      this.main.game.reset(0);    // 0 是关卡
      this.main.addChild(this.main.game);
      this.main.canvasIndex = 20;
		}
    public touchMove(e:egret.TouchEvent)
    {  

     }
    public touchUp(e:egret.TouchEvent)
    {
    }
  

    
}