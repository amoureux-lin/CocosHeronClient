
export default class PdbModel{
    private static instance: PdbModel = null;
    public static getInstance(): PdbModel {
        this.instance = this.instance || new PdbModel();
        return this.instance;
    }

   public onload(){
        
   }
}


