class LoadingUI2 extends egret.Sprite implements RES.PromiseTaskReporter {
	
	public im:egret.Bitmap;
	public im1:egret.Bitmap;
    public constructor() {
        super();

		this.im1 =Main.createBitmapByName("game_uijn1_png");
		this.addChild(this.im1);
		this.im1.y = 490;
		this.im1.width = 480;

		this.im =Main.createBitmapByName("game_uijn2_png");
		this.addChild(this.im);
		this.im.y = 500;
		this.im.scaleX = 0 ;
		this.im.width = 480;
    }


    public onProgress(current: number, total: number): void {
        //进度条伸长效果
		this.im.scaleX = current/total;	
    }
}

