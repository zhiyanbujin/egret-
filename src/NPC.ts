abstract class NPC extends egret.Sprite {
	public vis:boolean;
	public nm:NPCManager;
	public hp:number;
	
	public constructor(nm:NPCManager) {
		super();
		this.nm = nm;
		this.vis = true;



	}


	public abstract update();
	public abstract isHit(x:number,y:number):boolean;
	public abstract dead();
}