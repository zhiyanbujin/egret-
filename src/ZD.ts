class ZD extends egret.Sprite {

public static VN:number = 15 ;		//常量 跟踪转向速度

public game:MainGame;
public im:egret.Bitmap;
public v:number;		//直线速度 0向上，顺时针是正方向
public n:number;		//旋转角度
public vx:number;		//横向速度
public vy:number;		//纵向速度

public vis:boolean;		//是否生存

public id:number;		//子弹种类索引
public t:number;		//动画帧计时器
public m:number;        //子弹状态索引

public gj:number;		//子弹攻击力

public dx:number;
public dy:number;			//玩家坐标基础上的偏移值
public static fi:number = 0 ;	//激光的动画帧

public npc:NPC;				//追踪的目标
public bn:number;
	public constructor(id:number,x:number, y:number,//子弹生成位置
					   v:number, n:number,//速度与角度							
	 					game:MainGame) {
		super();
		this.game = game;
		this.id = id;

	

		this.x = x; this.y = y;
		this.v = v;	this.n = n;

		//sin用的是弧度制 n是角度制，所以 n* Math.PI / 180 转换为弧度制。
		this.vx = v * Math.sin(n * Math.PI / 180);
		this.vy= -v * Math.cos(n * Math.PI / 180);



		switch(this.id){
			case 0 :
				this.im = Main.createBitmapByName("pzd2_1_png");
				this.addChild(this.im);
				this.gj = 1;
			break;
			case 1:
				this.im = Main.createBitmapByName("pzd2_11_png");
				this.addChild(this.im);
				this.gj = 2;
			break;
			//圆形闪烁
			case 2:
				this.im = Main.createBitmapByName("pzd2_3_png");
				this.addChild(this.im);
				this.t = 0;
				this.gj =2;
			break;
			//导弹
			case 3:
				this.im = Main.createBitmapByName("pzd1_3_png");
				this.addChild(this.im);
				this.t = 0;
				this.m = 0;

				this.gj = 5;
			break;

			//激光类型
			case 10:
				//用动画帧构造图片
				this.im = Main.createBitmapByName("pzd4"+ZD.fi+"_png");
				//每发射一颗子弹 就加一张
				ZD.fi++;		
				if(ZD.fi >= 10) ZD.fi = 0;
				this.addChild(this.im);
				//每次主循环发射一颗，每颗间距离是80
				this.vy = -80;  //-80为向上
				this.vx = 0 ;
				this.dx = this.dy = 0 ;
				this.n = 0;
				this.gj = 10;
			break;
			//跟踪导弹
			case 20:
				this.im = Main.createBitmapByName("pzd1_3_png");
				this.npc = null;	
				this.addChild(this.im);
				this.gj =2;
			break;
		
		}


		this.im.anchorOffsetX = this.im.width/2;
		this.im.anchorOffsetY = this.im.height/2;
		//因为导弹类型不需要旋转
		if(this.id !=3)
			this.im.rotation = n;
		this.vis = true;

	}

	public update(){

		//特殊的更新需要放在前面，进去直接更新，更新完return跳出结束更新
		if(this.id == 20){
			let bn = 0 ;		//目标角度 向上
		  	 if(this.npc == null){
				   this.npc = this.game.nm.getNPC();
			   }else{
				   bn = Math.atan2(this.npc.x -this.x,this.y-this.npc.y);
				   //这个角度是弧度制，转换成角度值
				   bn = bn * 180/ Math.PI;
			   }

		//N角度限制在 -180°~180°
		while(this.n <= -180)
			this.n += 360;
		while(this.n > 180)
			this.n -= 360;
		//若角度差值小于5度，两个角度变为等值
		if(Math.abs(this.n - bn) < ZD.VN){
			this.n = bn;

		}else{
			//
			if(this.n < bn){
				if(this.n < bn - 180)
					this.n -= ZD.VN;
				else
					this.n += ZD.VN;
			}else{
				if(this.n > bn + 180)
					this.n += ZD.VN;
				else 
					this.n -= ZD.VN;
			 }
		}	
		//sin用的是弧度制 n是角度制，所以 n* Math.PI / 180 转换为弧度制。
		//重新计算速度与角度
		this.vx = this.v * Math.sin(this.n * Math.PI / 180);
		this.vy= -this.v * Math.cos(this.n * Math.PI / 180);
		this.im.rotation = this.n;

		this.x +=this.vx;
		this.y +=this.vy;
		if(this.x < -100 || this.x > 580 || this.y < -100 || this.y > 900){
				this.vis = false;
		}


		return;
		}



		if(this.id == 10){
			//移动的是它和飞机之间的差值
			this.dx +=this.vx;
			this.dy +=this.vy;

			//偏移值：基础值+偏移
			//激光的坐标是在玩家坐标基础上加上改变值，移动的是改变值。这样就实现激光跟随玩家移动
			this.x = this.game.player.x + this.dx;
			this.y = this.game.player.y + 50 + this.dy;
			//出屏检测 
			if(this.y < -100 ){
				this.vis = false;
			}
			return;
		}
		if(this.id == 3){
			this.im.texture = RES.getRes("pzd1_"+Math.floor(Math.random()*2 + 3)+"_png");
			switch(this.m ){
				//初始角度更新10次主循环
				case 0 :
					this.t++;
					this.x+=this.vx;
					this.y+=this.vy;
					if(this.t >=10){
						this.t =0;
						this.m =1;
					}
				break;
				//发出后停滞一段时间
				case 1:
					this.t++;
					if(this.t >=5){
						this.t =0;
						this.m =2;
						this.vy = 0;
					}
					break;
				//向上加速运动
				case 2:
					this.y+=this.vy;
					this.vy -=2;
					//这段是独立代码，所以需要检测出屏子弹消失
					if(this.y <-100)
						this.vis = false;
					break;
			}
			return;	//跳出
		}

		this.x +=this.vx;
		this.y +=this.vy;
		//闪烁子弹
		if(this.id ==2){
			this.t++;
			if(this.t >= 6){
				this.t = 0;
				//图片会变，所以t在0。1，2时除以3是0.几+3取整为3，t为3，4，5时除以3为1.几+3取整为4
				//这样结果就为3和4之间变化。图片名为3和4
				this.im.texture = RES.getRes("pzd2_"+Math.floor(this.t/3 + 3)+"_png");
			}
		}
		//子弹超出屏幕，子弹消失
		//被工厂管理的对象一定要有销毁条件。
		if(this.x < -100 || this.x > 580 || this.y < -100 || this.y > 900)
		this.vis = false;



	}
}