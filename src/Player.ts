class Player extends egret.Sprite{
	public im:egret.Bitmap;		//玩家图片
	public bh:egret.Bitmap;		// 			保护罩图片
	public ox:number;			//上一帧触笔位置。点击轨迹跟随
	public nx:number;			//当前触笔位置
	public vx:number;			//实际移动距离
	
	public oy:number;			//纵向···
	public ny:number;			
	public vy:number;			

	public isDown:boolean;		//是否处于点击状态
	public v:number = 30;		//飞机能够允许的最大速度

	public fi:number;			//当前动画帧
	public t:number;				//发射子弹计时器
	public game:MainGame;
	public hp:number;
	public m:number;
	public bhT:number;			//保护罩倒计时 持续3秒
	public constructor(game:MainGame) {
		super();

		this.game= game;

		this.im = Main.createBitmapByName("player1_3_png");
		this.im.anchorOffsetX = this.im.width/2;
		this.im.anchorOffsetY =this.im.height/2;
		this.addChild(this.im);
		 this.x = 240;
		 this.y =800;
		this.isDown = false;

		this.t = 0 ;
		this.hp = 0;
		this.bh = Main.createBitmapByName("bsxg1_1_png");
		this.bh.anchorOffsetX = this.bh.width/2;
		this.bh.anchorOffsetY =this.bh.height/2;
		this.addChild(this.bh);
		this.bh.scaleX = this.bh.scaleY = 0.5;

		this.isDown = false;
		this.x = 240;this.y = 1000;
		this.m = this.t = 0;
		this.bhT = 60;			//60次主循环是3秒

		// this.v = MainData.getInstrins().playerV;
	}
	 public touchDown(e:egret.TouchEvent)
    {	
		this.isDown = true;			//玩家点击
		this.ox = this.nx = e.stageX;		//第一次点击没有上一帧位置，所以相同位置
		this.oy = this.ny = e.stageY;
		this.vx = this.vy = 0;				
        
    }
    public touchMove(e:egret.TouchEvent)
    {
       this.nx = e.stageX;		//ny跟着触笔，时刻获取最新位置。、
	   this.ny = e.stageY;
    }
    public touchUp(e:egret.TouchEvent)
    {
       this.isDown = false;		//触笔抬起，移动结束。
    }

	public update(){
		//保护罩时间>0。减到0 消失，图片可见性为false
		if(this.bhT > 0 ){
			this.bhT--;
			if(this.bhT <=0){
				this.bh.visible = false;
			}
		}

		switch(this.m){
			// 0--下方飞出
			case 0 :
				this.y -=this.v;
				if(this.y <= 400){
					this.m =1;
					this.t = 0 ;
				}
			break;
			//1--正常游戏
			case 1 :
				this.fire();
				this.movePlayer();
				break;
			// 10--胜利等待
			case 10:
				this.t++;
				if(this.t >= 20){
					this.t = 0;
					this.m = 11;
					this.vy = 0 ;
				}
			break;
			// 11-胜利飞出
			case 11:
				this.y -=this.vy;
				this.vy +=3;
				if(this.y < -200){
					//游戏胜利的切换
					this.game.reset(this.game.level+1);
				}
			break;

			case 20:
			this.t++;
			if(this.t >=30){
				this.game.main.removeChild(this.game);
				this.game.main.over.reset();
				this.game.main.addChild(this.game.main.over);
				this.game.main.canvasIndex = 30;
			}
			break;
		}

	}
	public movePlayer(){

		if(this.isDown == true ){
			let a = this.ny - this.oy;
			let b = this.nx - this.ox;
			let c = Math.sqrt(a*a + b*b);
		
		if( c > this.v){
			this.vx = this.v*b/c;
			this.vy = this.v*a/c;
			this.ox += this.vx;
			this.oy += this.vy;
		}else{
			this.vx = b;
			this.vy = a;
			this.ox = this.nx;
			this.oy = this.ny;
		}
		//飞机跟着速度一起移动
		 this.x +=this.vx ;
		 this.y +=this.vy ;
		 //边界检测
		 if(this.x < 0)
			 this.x = 0;
		 else if(this.x > 480)
		 	this.x = 480;
		if(this.y < 0)
			this.y = 0;
		else if(this.y > 800)
			this.y = 800;
		}
		else{
			this.vx = 0;
		}


		if(this.vx < 0 ){
			//向左飞：
			if(this.fi > -2)
				this.fi --;
			}else if(this.vx > 0)
			{
				if(this.fi < 2)
				this.fi++;
			}
			else{
				this.fi = 0 ;
			}
			this.resetFI();
	}
	



	public resetFI(){
		
		 switch(Math.floor(this.fi))
		 {
			 case 0:
				 this.im.texture=RES.getRes("player1_3_png");
			 break;
			 case -1:
				this.im.texture=RES.getRes("player1_2_png");
				this.im.scaleX=1;
			 break;
			 case -2:
				this.im.texture=RES.getRes("player1_1_png");
				this.im.scaleX=1;
			 break;
			 case 1:
				this.im.texture=RES.getRes("player1_2_png");
				this.im.scaleX=-1;
			 break;
			 case 2:
				this.im.texture=RES.getRes("player1_1_png");
				this.im.scaleX=-1;
			 break;
		 }
	}
	//专用于发射子弹
	public fire(){

		//激光子弹
		// this.game.zm.create(10,this.x,this.y,0,180,this.game);

		//追踪导弹
		this.t++;
		if(this.t >= 20){
			 this.game.zm.create(20,this.x,this.y,15,135,this.game);
			 this.game.zm.create(20,this.x,this.y,15,-135,this.game);
			//   this.game.zm.create(20,this.x,this.y,15,45,this.game);
			//  this.game.zm.create(20,this.x,this.y,15,-45,this.game);
			 this.t = 0 ;
		}
	// 	this.t++;
		//每4次主循环发射一颗
		// if(this.t %4 == 0){
		// 	    this.game.zm.create(1,this.x,this.y,20,0,this.game);
		// }
		if(this.t >= 15){
           //调用create才会生成一颗子弹
             this.game.zm.create(0,this.x,this.y,20,0,this.game);
            this.game.zm.create(1,this.x,this.y,20,-15,this.game);
            this.game.zm.create(0,this.x,this.y,20,-30,this.game);
            this.game.zm.create(1,this.x ,this.y,20,15,this.game);
            this.game.zm.create(0,this.x,this.y,20,30,this.game);

           for(let i = 0 ; i < 10 ; i++){
               this.game.zm.create(2,this.x,this.y,15,Math.random()*360,this.game);
           } 

    //      this.game.zm.create(3,this.x,this.y,10,210,this.game);
	// 	 this.game.zm.create(3,this.x,this.y,10,150,this.game);
		

    //         this.t = 0;

       }
	}
	public isHit(x:number , y:number):boolean{
		//子弹与保护罩的碰撞检测	点和圆形碰撞检测
		if(this.bhT > 0 ){
			// this.x this.y是圆心， 60是半径  勾股定理 ，进入圆算碰撞。
			//两点间距离公式。横坐标差的平方+纵坐标差的平方再开方 
			if((this.x -x )*(this.x -x ) + (this.y -y )*(this.y - y ) < 60*60){
				return true;
			}
			return false;
		}
		if(this.m !=1)
			return false;
		if(Math.abs(this.x - x) < 20 && Math.abs(this.y -y )<20){
			//玩家死亡
			return true;	

		}
			return false;
	}
	public dead(){
		//环状爆炸
		for(let i = 0 ; i < 10 ; i++){		//环数 10圈
			let dn =Math.random()*Math.PI * 2;
			for(let j = 0 ; j < 15 ; j ++) 		//每个环15个爆炸个数   
			{
				this.game.tm.create(0,
				//圆的解析式 xy为中心，（i+1）*30为半径
				this.x + (i+1)*30* Math.sin(dn+Math.PI*2*j/15),
				this.y + (i+1)*30* Math.cos(dn+Math.PI*2*j/15),
				i,Math.random() * 10 +5,this.game);
			}
		}
		this.x = 240;
		this.y = 700;
		this.m =20 ;
		this.t = 0;		 
		this.bhT = 60;
		this.bh.visible = true;
	}

	//通过关卡
	public win(){
		 this.t = 0 ;
		 //玩家飞出屏幕 
		 this.m = 10;
		 
	}
	public reset(){
		this.isDown = false;
		this.x = 240;this.y = 1000;
		this.m = this.t = 0;
		this.bhT = 60;			//60次主循环是3秒
	}
}
