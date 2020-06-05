class NPC1 extends NPC{

	//飞下来转向回去

	public im:egret.Bitmap[] = [] ;
	public vy:number;		//移动速度
	public dy:number;		//停留位置
	public m:number;
	public t:number;

	public constructor(x:number,y:number,vy:number,dy:number,nm:NPCManager) {

		super(nm);
		this.x = x ;this.y = y;
		this.vy = vy;
		this.dy = dy;

		this.hp = 10;

		this.m = 0 ;
		this.t = 0;

		this.im[0] = Main.createBitmapByName("npc6_png");
		this.im[0].anchorOffsetX = this.im[0].width;
		this.im[0].anchorOffsetY = this.im[0].height/2;
		this.addChild(this.im[0]);
		this.im[1] = Main.createBitmapByName("npc6_png");
		this.im[1].anchorOffsetX = this.im[1].width;
		this.im[1].anchorOffsetY = this.im[1].height/2;
		this.im[1].scaleX = -1;
		this.addChild(this.im[1]);
	}

	public update(){
		switch(this.m){
			//向下飞
			case 0 :
				//向下飞
				this.y +=this.vy;
				//飞到停留位置
				if(this.y > this.dy){
				
					this.y = this.dy;
					this.t = 0 ;
					//进入下一状态
					this. m = 1 ;
				}
				break;
			//停留	
			case 1 :
			//间隔性发射子弹
				if(this.t % 3 == 0){
					this.nm.game.nzm.create(0,this.x ,this.y , 15,180);
					this.nm.game.nzm.create(0,this.x ,this.y , 15,160);
					this.nm.game.nzm.create(0,this.x ,this.y , 15,200);
				}
				this.t++;
				//图层转向 
				//10次 主循环的时间从0变到180度
				if(this.x < 240) //屏幕左边逆时针转
				this.rotation = -180 * this.t/10;
				else 			//屏幕右边顺时针转
				this.rotation =  180 * this.t/10;
				if(this.t >=10){
					this.t = 0;
					this.m = 2 ;
				}
			break;
			//向上飞
			case 2 :
				this.y -=this.vy;
				//出屏，仓库清除
				if(this.y < -100){
					this.vis = false;
				}
			break;
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
		for(let k = 0 ; k < 10 ; k ++){			
			this.nm.game.tm.create( 0, this.x + Math.random()*100 - 50 ,
			this.y + Math.random()*100 - 50 ,
			Math.floor(Math.random() * 5), 10,this.nm.game);
		}
	}
}