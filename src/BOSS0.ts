class BOSS0 extends NPC{

	public im:egret.Bitmap;
	public m:number;
	public t:number;

	public constructor(x:number,y:number,nm:NPCManager) {

		super(nm);
		this.x = x ;this.y = y;
		this.im = Main.createBitmapByName("boss50_png");
		this.im.anchorOffsetX = this.im.width/2;
		this.im.anchorOffsetY = this.im.height/2;
		this.addChild(this.im);

		this.m = this.t = 0;
		this.hp = 500;
	}

 
	public update(){
		switch(this.m){
			//boss停的位置
			case 0:
				this.y+=10;
				if(this.y >= 150){
					this.t = 20 ;
					this.m = 1;
				}
			break;
			//等待状态
			case 1:
				this.t--;
				if(this.t <=0){
					// this.m = 14;	//固定值m就是固定类型子弹
					this.m = Math.floor(Math.random() * 5 ) + 10;		//随机类型子弹
					this.t = 0 ;
				}
			break;
			//发射子弹	环形
			case 10:
				this.t++;
				//每隔3次主循环发射一颗
				if(this.t % 3 == 0 ){
					for(let i = 0 ; i < 36 ; i++){
						//i<5 5串子弹 i < 36 环形子弹
						//160+i*10 间隔10度发一颗
					this.nm.game.nzm.create(1, this.x, this.y, 10 ,160+i*10);
					}
				}
				if(this.t >= 20){
					this.t = Math.random()* 20 + 10;
					this.m = 1;
				}
			break;
			case 11:
				this.t++;
				//随着t的++,发射子弹的角度不断变化
				this.nm.game.nzm.create(1, this.x, this.y, 10 ,180+this.t*10 );
					this.nm.game.nzm.create(1, this.x, this.y, 10 ,180 - this.t*10 );
				//子弹发射跟t有关联	间隔10度发一颗 
				if(this.t >= 36){
					this.t = Math.random()* 20 + 10;
					this.m = 1;		
					
				}
			break;
			//矩阵弹幕
			case 12:
				this.t++;
				if(this.t % 20 > 14){	//每10次主循环中15，16，17，18，19发射子弹 5颗
					for(let i = 0 ; i < 5 ; i++){
						this.nm.game.nzm.create(1, this.x, this.y, 10 ,
						Math.floor(this.t/20)*20 +130+i*5 );
						//135度左右打5颗，				
					}
				}
				if(this.t >= 100){
					this.t = Math.random() * 20 + 10;
					this.m =1 ;
				}
			break;
			//鞭形子弹
			case 13:
				this.t++;
				//速度随着时间增加，产生后发先至效果
				this.nm.game.nzm.create( 1, this.x - 50, this.y, 6 + this.t *2 ,190 - this.t );
				this.nm.game.nzm.create( 1, this.x+50, this.y, 6 + this.t *2 ,170 + this.t);
				if(this.t >= 10){
						this.t = Math.random() * 20 + 10;
						this.m =1 ;
				}
				break;
			//朝向型子弹
			case 14 :
				this.t++;
				//打5团，每10次主循环打一组，
				if(this.t % 10 > 4){
					this.nm.game.nzm.create( 1, this.x - 50, this.y, 15);
				}
				if(this.t >= 50){
					this.t = Math.random() * 20 + 10;
					this.m =1 ;
				}
				
			break;
		}

	}
	public isHit(x:number,y:number):boolean{

		if(Math.abs(x - this.x ) < 45 &&
		Math.abs(y - this.y )< 83){
			return true;
		}	
		if(Math.abs(x - this.x) < 73 &&
		Math.abs(y -(this.y + 44)) < 36){
			return true;
		}
		
	}
	public dead(){
			for(let i = 0 ; i < 10 ; i++){		//环数
			let dn =Math.random()*Math.PI * 2;
			for(let j = 0 ; j < 15 ; j ++) 		//每个环爆炸个数   
			{
				this.nm.game.tm.create(0,
				this.x + (i+1)*30* Math.sin(dn+Math.PI*2*j/15),
				this.y + (i+1)*30* Math.cos(dn+Math.PI*2*j/15),
				i,Math.random() * 10 +5,this.nm.game);
			}
		} 
		this.nm.game.player.win();
	}
	

}