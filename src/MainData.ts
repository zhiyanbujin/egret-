class MainData {
	
	//单例
	private static my:MainData;
	public static getInstrins():MainData{
		if(!MainData.my){
			MainData.my = new MainData();
		}
		return MainData.my;
	}








	/**
	 * 玩家的速度
	 */
	public playerV:number;
	public zdV:number;

	public constructor() {
		
	
		let data = RES.getRes("data_json");
		this.playerV = data["playV"];
		this.zdV = data["zdV"];
	}
}