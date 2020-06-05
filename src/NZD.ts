class NZD extends egret.Sprite{

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

	public constructor(id:number,x:number, y:number,//子弹生成位置
					   v:number, n:number,//速度与角度							
	 					game:MainGame) {
		super();
		this.game = game;
		this.id = id;

		switch(this.id){
			case 0 :
				this.im = Main.createBitmapByName("nzd1_png");
				this.addChild(this.im);
			break;
			case 1:
				this.im = Main.createBitmapByName("nzd2_png");
				this.addChild(this.im);
			break;
			// //圆形闪烁
			// case 2:
			// 	this.im = Main.createBitmapByName("pzd2_3_png");
			// 	this.addChild(this.im);
			// 	this.t = 0;
			// break;
			// //导弹
			// case 3:
			// 	this.im = Main.createBitmapByName("pzd1_3_png");
			// 	this.addChild(this.im);
			// 	this.t = 0;
			// 	this.m = 0;
			// break;
		}


		
		this.im.anchorOffsetX = this.im.width/2;
		this.im.anchorOffsetY = this.im.height/2;

		this.x = x; this.y = y;
		this.v = v;	this.n = n;

		//sin用的是弧度制 n是角度制，所以 n* Math.PI / 180 转换为弧度制。
		this.vx = v * Math.sin(n * Math.PI / 180);
		this.vy= -v * Math.cos(n * Math.PI / 180);

		//因为导弹类型不需要旋转
		if(this.id !=3)
			this.im.rotation = n;

		this.vis = true;

	}

	public update(){

		// if(this.id == 3){
		// 	this.im.texture = RES.getRes("nzd1_"+Math.floor(Math.random()*2 + 3)+"_png");
		// 	switch(this.m ){
		// 		//初始角度更新10次主循环
		// 		case 0 :
		// 			this.t++;
		// 			this.x+=this.vx;
		// 			this.y+=this.vy;
		// 			if(this.t >=10){
		// 				this.t =0;
		// 				this.m =1;
		// 			}
		// 		break;
		// 		//发出后停滞一段时间
		// 		case 1:
		// 			this.t++;
		// 			if(this.t >=5){
		// 				this.t =0;
		// 				this.m =2;
		// 				this.vy = 0;
		// 			}
		// 			break;
		// 		//向上加速运动
		// 		case 2:
		// 			this.y+=this.vy;
		// 			this.vy -=2;
		// 			//这段是独立代码，所以需要检测出屏子弹消失
		// 			if(this.y <-100)
		// 				this.vis = false;
		// 			break;
		// 	}
		// 	return;	//跳出
		// }

		this.x +=this.vx;
		this.y +=this.vy;
		// //闪烁子弹
		// if(this.id ==2){
		// 	this.t++;
		// 	if(this.t >= 6){
		// 		this.t = 0;
		// 		//图片会变，所以t在0。1，2时除以3是0.几+3取整为3，t为3，4，5时除以3为1.几+3取整为4
		// 		//这样结果就为3和4之间变化。图片名为3和4
		// 		this.im.texture = RES.getRes("nzd1_png"+Math.floor(this.t/3 + 3)+"_png");
		// 	}
		// }
		//子弹超出屏幕，子弹消失
		//被工厂管理的对象一定要有销毁条件。
		if(this.x < -100 || this.x > 580 || this.y < -100 || this.y > 900)
			this.vis = false;



	}
}