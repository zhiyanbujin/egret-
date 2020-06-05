class BG extends egret.Sprite{

	public bg:egret.Bitmap[] = [];
	public fg:egret.Bitmap;		//前景

	public vy:number;	//背景移动的速度
	public game:MainGame;	//上一级指针

	public constructor(game:MainGame) {
		super();	
		this.game = game;
		for(let i = 0 ; i < 2; i ++){
			this.bg[i] = Main.createBitmapByName("bg11_jpg");
			this.addChild(this.bg[i]);
			//对图片的定位
			this.bg[i].y = 0 - i* this.bg[i].height;
		}
		//前景
		this.fg = Main.createBitmapByName("bg12_png");
		this.fg.y = Math.random() * 800;
		this.addChild(this.fg);


		this.vy = 10;	//背景移动速度
	}

	public update(){
		//背景更新
		for(let i = 0 ; i < 2; i++){
			//图片向下移动
			this.bg[i].y+=this.vy;
			//当图片移动到屏幕下面就得放到上面
			if(this.bg[i].y > 800){
				//有几张图片就挪到几张图片高度
				this.bg[i].y -= 2*this.bg[i].height;
			}
		}

		this.fg.y +=this.vy*1.5;
		if(this.fg.y > 800){
			this.resetFG();
		}
	}
	//重置前景
	public resetFG(){
		//随机0~2   0天梯，1，2
		let id = Math.floor(Math.random()*3);
		switch(id){
			case 0 :
				this.fg.texture = RES.getRes("bg12_png");
				if(Math.random()*100 < 50){//50%概论向左还是向右
					this.fg.scaleX = -1;
					this.fg.x = 480;
				}else{
					this.fg.scaleX = 1;
					this.fg.x = 0;
				}	
			break;
			case 1:
				this.fg.texture = RES.getRes("bg13_png");
				this.fg.x = 480 - Math.random()*184;	
				this.fg.scaleX = 1;
				break;
			case 2 :
				this.fg.texture = RES.getRes("bg13_png");
				this.fg.x = Math.random() * 184;	
				this.fg.scaleX = -1;
				break;
		}
		this.fg.y = -500 - Math.random()*100;
	}

	public reset(){
		switch(this.game.level){
			case 0:
				for(let i = 0 ; i < 2; i ++){
				this.bg[i].texture = RES.getRes("bg11_jpg");
				}
			break;
			case 1:
				for(let i = 0 ; i < 2; i ++){
				this.bg[i].texture = RES.getRes("bg31_jpg");
				}
			break;
		}
	}	
}