//index.js
//获取应用实例
const app = getApp()

var intt;
Page({
  data:{
    show:false,
    showq:false,
    showbu:true,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    timecount: '00:00:00',
    cost: 0,
    flag: 1,
    endtime: "",
    dis:false,

    ask:"    ",
    askcolor:"green",
  
    alltext:["红色","蓝色","紫色","绿色","橙色","黄色"],
    allcolor:["red","skyblue","purple","green","orange","yellow"],
    allq:["之前出现的文字是什么？","之前出现的文字是什么颜色？","出现的第一个文字是什么？","出现的第一个文字是什么颜色？","出现的第二个文字是什么？","出现的第二个文字是什么颜色？"],
    text:[],
    color:[],
    q:'',
    choose:[],
    true:0,
    indexq:0,
    ans:'',
    right:0

  },
  bindViewTap: function() {
   
  },
  onLoad: function () {
  
   
  },
  getUserInfo: function(e) {
  },


  show:function() {

   if(this.data.indexq<5)
   {
    var texttemp=[];
    texttemp.push(Math.floor(Math.random()*6));
    var colortemp=[];
    colortemp.push(Math.floor(Math.random()*6));
    var choosetemp=[];
    var qtemp=this.data.allq[Math.floor(Math.random()*2)];
     if(qtemp=="之前出现的文字是什么？")
     {
       for(var i=0;i<4;){
         var num=Math.floor(Math.random()*6);
         var f=0;
         for(var j=0;j<choosetemp.length;j++)
         {
          
             if(choosetemp[j]==num||num==texttemp[0])
             {
               f=1;
               break;
             }
         }
 
       
         if(f==0)
         {
             choosetemp.push(num);
             i++;
         }
       }
       choosetemp[Math.floor(Math.random()*4)]=texttemp[0];
       this.setData({
         ans:texttemp[0],
        });
     }else{
       for(var i=0;i<4;){
         var num=Math.floor(Math.random()*6);
         var f=0;
         for(var j=0;j<choosetemp.length;j++)
         {
        
             if(choosetemp[j]==num||num==colortemp[0])
             {
               f=1;
               break;
             }
         }
         if(f==0)
         {
             choosetemp.push(num);
             i++;
         }
 
        
       }
       choosetemp[Math.floor(Math.random()*4)]=colortemp[0];
       this.setData({
        ans:colortemp[0],
       });
     }
 
 
    
         this.setData({
           show:true,
           showbu:false,
           text:texttemp,
           color:colortemp,
           choose:choosetemp,
           q:qtemp
         });
        
         var that=this;
         setTimeout(function () {
           that.setData({
             show:false,
             showq:true
           });
         that.start();
          }, 3000) //延迟时间 这里是1秒
   }else if(this.data.indexq<10){
    var texttemp=[];
    texttemp.push(Math.floor(Math.random()*6));
    var colortemp=[];
    colortemp.push(Math.floor(Math.random()*6));
    var choosetemp=[];
    var qtemp=this.data.allq[Math.floor(Math.random()*2)];
     if(qtemp=="之前出现的文字是什么？")
     {
       for(var i=0;i<4;){
         var num=Math.floor(Math.random()*6);
         var f=0;
         for(var j=0;j<choosetemp.length;j++)
         {
          
             if(choosetemp[j]==num||num==texttemp[0])
             {
               f=1;
               break;
             }
         }
 
       
         if(f==0)
         {
             choosetemp.push(num);
             i++;
         }
       }
       choosetemp[Math.floor(Math.random()*4)]=texttemp[0];
       this.setData({
         ans:texttemp[0],
        });
     }else{
       for(var i=0;i<4;){
         var num=Math.floor(Math.random()*6);
         var f=0;
         for(var j=0;j<choosetemp.length;j++)
         {
         
             if(choosetemp[j]==num||num==colortemp[0])
             {
               f=1;
               break;
             }
         }
         if(f==0)
         {
             choosetemp.push(num);
             i++;
         }
 
        
       }
       choosetemp[Math.floor(Math.random()*4)]=colortemp[0];
       this.setData({
        ans:colortemp[0],
       });
     }
 
 
    
         this.setData({
           show:true,
           showbu:false,
           text:texttemp,
           color:colortemp,
           choose:choosetemp,
           q:qtemp
         });
        
         var that=this;
         setTimeout(function () {
           that.setData({
             show:false,
             showq:true
           });
         that.start();
          }, 1500) //延迟时间 这里是1秒
   }else if(this.data.indexq<15){
    var texttemp=[];
    texttemp.push(Math.floor(Math.random()*6));
    texttemp.push(Math.floor(Math.random()*6));
    var colortemp=[];
    colortemp.push(Math.floor(Math.random()*6));
    colortemp.push(Math.floor(Math.random()*6));
    var choosetemp=[];
    var qtemp=this.data.allq[Math.floor(Math.random()*4+2)];
     if(qtemp=="出现的第一个文字是什么？")
     {
       for(var i=0;i<4;){
         var num=Math.floor(Math.random()*6);
         var f=0;
         for(var j=0;j<choosetemp.length;j++)
         {
          
             if(choosetemp[j]==num||num==texttemp[0])
             {
               f=1;
               break;
             }
         }
 
       
         if(f==0)
         {
             choosetemp.push(num);
             i++;
         }
       }
       choosetemp[Math.floor(Math.random()*4)]=texttemp[0];
       this.setData({
         ans:texttemp[0],
        });
     }else if(qtemp=="出现的第一个文字是什么颜色？"){
       for(var i=0;i<4;){
         var num=Math.floor(Math.random()*6);
         var f=0;
         for(var j=0;j<choosetemp.length;j++)
         {
          
             if(choosetemp[j]==num||num==colortemp[0])
             {
               f=1;
               break;
             }
         }
         if(f==0)
         {
             choosetemp.push(num);
             i++;
         }
 
        
       }
       choosetemp[Math.floor(Math.random()*4)]=colortemp[0];
       this.setData({
        ans:colortemp[0],
       });
     }else if(qtemp=="出现的第二个文字是什么颜色？"){
      for(var i=0;i<4;){
        var num=Math.floor(Math.random()*6);
        var f=0;
        for(var j=0;j<choosetemp.length;j++)
        {
         
            if(choosetemp[j]==num||num==colortemp[1])
            {
              f=1;
              break;
            }
        }
        if(f==0)
        {
            choosetemp.push(num);
            i++;
        }

       
      }
      choosetemp[Math.floor(Math.random()*4)]=colortemp[1];
      this.setData({
       ans:colortemp[1],
      });
    }else{
      for(var i=0;i<4;){
        var num=Math.floor(Math.random()*6);
        var f=0;
        for(var j=0;j<choosetemp.length;j++)
        {
         
            if(choosetemp[j]==num||num==texttemp[1])
            {
              f=1;
              break;
            }
        }
        if(f==0)
        {
            choosetemp.push(num);
            i++;
        }

       
      }
      choosetemp[Math.floor(Math.random()*4)]=texttemp[1];
      this.setData({
       ans:texttemp[1],
      });
    }
 
 
    
         this.setData({
           show:true,
           showbu:false,
           text:texttemp,
           color:colortemp,
           choose:choosetemp,
           q:qtemp
         });
        
         var that=this;
         setTimeout(function () {
           that.setData({
             show:false,
             showq:true
           });
         that.start();
          }, 2000) //延迟时间 这里是1秒
   }
  

      
  },

  click:function(e){
      var index=e.currentTarget.dataset.index;
      this.stop();
     
      if(this.data.ans==index){
        this.setData({
          ask:"答案正确",   
          askcolor:"green",
          right:this.data.right+1
         });
      }else{
        this.setData({
          ask:"答案错误",
          askcolor:"red"
         });
      }
 
        this.setData({
         dis:true,
        
        });

        var that=this
        setTimeout(function () {
          that.setData({
            show:false,
            showq:false,
            showbu:true,
            dis:false,
            ask:"",
            indexq:that.data.indexq+1
          });
          that.show();
         }, 2000)

         if(this.data.indexq==16)
         {
           this.stop();
         }
      


    
},


  start:function () {
    var that = this;
    //停止（暂停）
    clearInterval(intt);
    //时间重置
   
    intt = setInterval(function () { that.timer() }, 50);
  },
  //暂停
  stop: function () {
    clearInterval(intt);
  },
  //停止
  Reset: function () {
    var that = this
    clearInterval(intt);
    that.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      timecount: '00:00:00',
    })
  },
  timer: function () {
    var that = this;
   
    that.setData({
      millisecond: that.data.millisecond + 5
    })
    if (that.data.millisecond >= 100) {
      that.setData({
        millisecond: 0,
        second: that.data.second + 1
      })
    }
    if (that.data.second >= 60) {
      that.setData({
        second: 0,
        minute: that.data.minute + 1
      })
    }
 
    if (that.data.minute >= 60) {
      that.setData({
        minute: 0,
        hour: that.data.hour + 1
      })
    }
    that.setData({
      timecount: that.data.hour + ":" + that.data.minute + ":" + that.data.second + ":" + that.data.millisecond
    })
  },


  
})
