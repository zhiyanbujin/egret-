class TX extends egret.Sprite{

	public im:egret.Bitmap;
	public id:number;		//代表种类
	public vis:boolean;		//被工厂管理的都需要vis
	public fi:number;		//代表动画帧播放第几帧
	public t:number;		//延时计时器 记录延时如：3次主循环出现，
	public m:number;		//状态
	public l:number;		//特效播放的总时长

	public tm:TXManager;	//上级指针

	public constructor(id:number,x:number, y:number,
		t:number,l:number,tm:TXManager) {
	
		super();
		this.id = id;
		this.x = x ;
		this.y = y;
		this.t = t;
		this.l = l;
		this.m = 0;
		this. fi = 0 ;
		this.vis = true;	//若它是false 工厂内对象消失
		this.tm = tm;

		this.im = Main.createBitmapByName("tx1_1_png");
		this.anchorOffsetX = this.im.width/2;
		this.anchorOffsetY = this.im.height/2;
		this.addChild(this.im);
		//随机角度。
		this.rotation = Math.random() * 360;

		if(this.t > 0){
			//虽然在仓库，但是看不到
			//0 是倒计时， 1是播放
			this.visible = false;
			this.m = 0;
		}else{
			this.visible = true;
			this.m = 1 ;
		}


	}

	public update(){
		 switch(this.m ){
			 //
			 case 0:
			 	//倒计时
			 	this.t-- ;
				 if(this.t <=0 ){
					 //出现爆炸
					 this.visible = true;
					 this.m = 1;		//播放
				 }
			 break;
			 case 1 :
			 	//动画播放
			 	this.fi++;
				 //
				 if(this.fi >= this.l){
					 this.vis =false;		//工厂里对象销毁
				 }else{						//没有播放完，动画帧切换
					 //动画切换公式	fi从0开始，到9，
					 //10是动画的张数有几张动画就*几。 fi是动画帧，l是动画长度，
					 this.im.texture = RES.getRes("tx1_"+Math.floor(this.fi*10/this.l + 1)+"_png");
				 }
		 }

	}
}