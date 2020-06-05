class NPC0 extends NPC{

	public game:MainGame;
	public im:egret.Bitmap[] = [];	//2张拼起来的图片所以用数组
	
	public vy:number;			//速度

	public constructor(x:number,y:number,vy:number,nm:NPCManager) {

		super(nm);
		this.x = x ;this.y = y;
		this.vy = vy;

		this.hp = 5;
		// for(let i = 0 ; i < 2; i++){
		// 	this.im[i] = Main.createBitmapByName("");
		// }
		
		this.im[0] = Main.createBitmapByName("npc5_png");
		this.im[0].anchorOffsetX = this.im[0].width;
		this.im[0].anchorOffsetY = this.im[0].height/2;
		this.addChild(this.im[0]);
		this.im[1] = Main.createBitmapByName("npc5_png");
		this.im[1].anchorOffsetX = this.im[1].width;
		this.im[1].anchorOffsetY = this.im[1].height/2;
		this.im[1].scaleX = -1;
		this.addChild(this.im[1]);

	}

	public update(){
		this.y +=this.vy;
		if(this.y > 1000){
			this.vis = false;
		}
	}


	//检测玩家子弹是否碰撞NPC，所以用布尔值 ，需要知道玩家子弹位置，所以需要X,Y
	public isHit(x:number,y:number):boolean{
		
		if(Math.abs(x - this.x) < this.im[0].width &&
			Math.abs(y - this.y) < this.im[0].height/2)
			{	return true;
			}
		//若没有子弹，返回false
		return false;
	}

	public dead(){
		for(let k = 0 ; k < 5 ; k ++){				//-25 到 +25
			this.nm.game.tm.create( 0, this.x + Math.random()*50 -25 ,
			this.y + Math.random()*50 -25 ,
			Math.floor(Math.random() * 5), 10,this.nm.game);
		}
	}
}