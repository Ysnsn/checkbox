//好游快爆爆米花任务,可兑换激活码、实物周边等
//我的邀请码 sdvf180uscf3
waterresult = "";
const axios = require("axios");
const hyck = config.hykb2.scookie; 
const $http=require("axios")
let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//照料id 我没加好友所以随机取得 第一个是我,不建议改ヽ(*´з｀*)ﾉ
//   const moment=require("moment")

//照料id 我没加好友所以随机取得 第一个是我,不建议改ヽ(*´з｀*)ﾉ
buid = [21039293,48653684,44191145,54216701,54184381,38442812,34977383,54099572,54060137,18344113,53950826,53334988,49100316,24158995,53043395,53746196,7495782,53752398,13268805,53540861,53169378,53481728,53480955,53236037,5015419,17998323,142234,53043027,53022651,52883552,52919017,52883915,2987459,52863870,52787172,52782808,52694050,20997885,51870224,51854475,45610785,51060995,51041635,22673480,26442566,49469272,49614447,2596430,49728164,49486242,49662192,49613978,46353292,49343258,45415658,49011759,48694743,48557745,39246562,48714555,7081589,19159172,1779737,48346086,48339861,47879039,23201290,48214589,48204930,48075558,576273,48074580,48043586,47937184,45231130,47937216,47236557,47889444,1656229,12094940,113403,35309397,47126286,39092668,46987060,46938478,33318766,39092819,24164451,46816636,20041171,1991977,45236927,45229941,45416573,45535123,11222716,45230227,29935848,32441297,23450463,45461447,8251603,45783763,14409304,12661364,45473957,45751761,23079057,140449,27139868,44840858,21273234,45078335,44758815,44838804,45234308,45466314,45562418,45045871,45507665,45263948,45249695,44042408,9169383,44761568,44471412,44440362]
scookie = hyck.match(/\|/)?encodeURIComponent(hyck):hyck
function get(a, b) {
  return new Promise(async (resolve) => {
    try {
      let res = await $http.post(
        `https://huodong3.3839.com/n/hykb/${a}/ajax.php`,
        `ac=${b}&r=0.${Math.round(Math.random() * 8999999999999999) + 1000000000000000}&scookie=${scookie}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 8.0.0; FRD-AL10 Build/HUAWEIFRD-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045224 Mobile Safari/537.36 V1_AND_SQ_7.1.0_0_TIM_D TIM/3.0.0.2860 QQ/6.5.5  NetType/WIFI WebP/0.3.0 Pixel/1080",
          },
        }
      );

      if (JSON.stringify(res.data).match(/玉米成熟度已经达到100/)) {
        await get("grow", "PlantRipe"); //收获
        await get("grow", "PlantSow"); //播种
        await get(a, b); //播种        
      }
      if (JSON.stringify(res.data).match(/还没有播种玉米/)) {
          let bzs = await get("grow", "PlantSow"); //播种
          if (bzs.seed && bzs.seed == 0) {
            //    console.log("莫得种子了")
            await get("grow", "GouMai&resure=1&gmmode=seed&tmpNum=10"); //购买种子*10
            await get("grow", "PlantSow"); //播种
          }
          await get(a, b);
        }
      if (b == "Watering") {
        if (res.data.key == "ok") {
          waterresult = `今日浇灌成功,获得${res.data.add_bmh}爆米花,连续浇灌${res.data.nowJiaoGuanDay}天,成熟度：${res.data.csd_num},爆米花：${res.data.baomihua}`;
          back = waterresult;
        } else {
          waterresult = res.data.info;
          back = waterresult;
        }
      } else {
        back = res.data;
      }
      console.log(back);
    } catch (err) {
      console.log(err);
    }
    resolve(back);
  });
}

function getid() {
  return new Promise(async (resolve) => {
    try {
      let res = await $http.get(
        "https://huodong3.3839.com/n/hykb/gs/index.php"
      );
      //预约游戏id
      str = res.data.match(/HdmodelUser\.Ling\((.+?)\)/g);
      let res2 = await $http.get(
        "https://huodong3.3839.com/n/hykb/grow/daily.php"
      );
      //任务id
      str2 = res2.data.match(
        /ACT\.Daily[a-z,A-Z]+(Share||Ling||JiaoHu){1,}\(\d+\)/g
      );
      id = str.concat(str2);
    } catch (err) {
      console.log(err);
    }
    resolve();
  });
}
async function task() {
  let logindata = await get("grow", "Dailylogin&id=174");
  if (logindata.key == "ok") {
  var mres = await $http.get(
    "https://cdn.jsdelivr.net/gh/space78/source/miling.json"
  );
  await get("friend", `Secretorder&miling=${mres.data.miling}`); //密令
  await get("wxsph", `send_egg&egg_data=${mres.data.egg}`); //视频彩蛋
//  await get("grow", "GuanZhu&singleUid=21039293"); //关注我
//  await get("signhelp", "useCode&code=21039293"); //邀请码
  await get("friend", "LingXinrenFuli");
  await get("grow", "shareEwai");
  //  await get("friend","EnterInviteCode&invitecode=sdvf180uscf3","") //填邀请码
  await getid(); //获取任务id
  await get("grow", "Watering&id=6"); //浇灌
 for (i of buid) {
    await get("grow", `gamehander&buid=${i}&icon_id=49`); //照料
    await get("grow",  `gamehander&buid=${i}&icon_id=888888`); //偷玉米
  }
  for (i of id) {
    i = i.match(/\.(.+)\((\d+)\)/);
    switch (i[1]) {
      case "Ling":
        await get("gs", `recordshare&gameid=${i[2]}`); //分享
        await get("gs", `ling&gameid=${i[2]}`); //领取
        break;
      case "DailyShare":
        await get("grow", `DailyShare&id=${i[2]}`); //发起分享
        await get("grow", `DailyShareCallb&id=${i[2]}`); //返回
        await get("grow", `DailyShare&id=${i[2]}`); //领取
        break;
      case "DailyGameLing":
        await get("grow", `DailyGamePlay&id=${i[2]}`); //打开试玩
        await get("grow", `DailyGameLing&id=${i[2]}`); //试玩领取
        break;
      case "DailyYuyueLing":
        await get("grow", `DailyYuyueLing&id=${i[2]}`); //预约领取
        break;
      case "DailyDouyinLing":
        await get("grow", "DailyDouyinCheck", i[2]);
        await get("grow", "DailyDouyinPlay", i[2]); //打开抖音
        await get("grow", "DailyDouyinLing", i[2]); //领取
        break;
      case "DailyVideoLing":
        await get("grow", `DailyVideoGuanzhu&id=${i[2]}`);
        await get("grow", `DailyVideoShare&id=${i[2]}`);
        await get("wxsph", "share&mode=qq"); //DailyVideoShare
        await get("grow", `DailyVideoLing&id=${i[2]}`);
      case "DailyJiaoHu":
        await get("grow", `DailyJiaoHu&id=${i[2]}`); //分享任务
        break;
      case "DailyDati":
        let ress = await get("grow", "DailyDati&id=4"); //获取题目
        if (ress.option1 && ress.expand) {
          i = 1;
          kw = 1;
          let yxid = ress.expand.split("##")[1] || "16876"; //获取游戏id
          let urll = `https://api.3839app.com/cdn/android/gameintro-home-1546-id-${yxid}-packag--level-2.htm`;
          let resss = await $http.get(urll);
          if (resss.data.result) {
            let strr = JSON.stringify(resss.data.result.data.downinfo.appinfo)
              .replace(/&nbsp;/g, "")
              .replace(/ /g, ""); //查答案
            reg = /错误|不属于|不是|不存在|没有|不需要|不能|不可以/;
            if (reg.test(ress.title)) {
              console.log("错误类型");
              for (i; i < 5; i++) {
                let strrr = ress["option" + i].replace(/ /g, "");
                if (!strr.match(strrr)) {
                  kw = i;
                  //        await get("grow", `DailyDatiAnswer&option=${ress["option" + i]}`, 4)
                }
              }
            } else {
              //    console.log("正确类型")
              for (i; i < 5; i++) {
                let strrr = ress["option" + i].replace(/ /g, "");
                if (strr.match(strrr)) {
                  kw = i;
                  //   await get("grow", `DailyDatiAnswer&option=${ress["option" + kw]}`, 4)
                }
              }
            }
            //瞎鸡儿答 非游戏类问题/找不到答案
            //算了不瞎鸡儿答了 自行去app里答吧
          }
          console.log("正确答案");
          console.log(ress["option" + kw]);
          await get("grow", `DailyDatiAnswer&option=${ress["option" + kw]}&id=4`);
        } else {
          console.log("劳资找不到答案,请自行去app里答题");
        }
        break;
      case "DailyFriendLing":
        await get("grow", `DailyFriendLing&id=${i[2]}`); //照料5次
        break;
      case "DailyInviteLing":
        let invite = await get("grow", `DailyInviteJump&id=${i[2]}`);
        let uid = invite.invite_url.match(/u=(.+?)&/);
        await get("grow", `DailyInvite&u=${uid ? uid[1] : ""}&rwid=10`); //邀请下载
        await get("grow", `DailyInviteLing&id=${i[2]}`);
        break;
    }
  }    
  let csdata = await get("grow", `Dailylogin&id=174`); //查询  
  if (csdata.key == "ok" && csdata.config && csdata.config.day_rw_csd) {
    result = `好游快爆2每日任务:\n\n今日获得${csdata.config.day_rw_csd}成熟度,共${csdata.config.chengshoudu}成熟度,${csdata.config.baomihua}爆米花`;
    if (csdata.config.chengshoudu == 100) {
      await get("grow", "PlantRipe"); //收获
      await get("grow", "PlantSow"); //播种
    }
  } else {
    result = csdata.key;
  }
  result = "" + waterresult + result;
  console.log(result);
 // let tasl1data = await $http.get(
   // "https://cdn.jsdelivr.net/gh/Wenmoux/sources@latest/other/activities.js"
//  );

 // eval(tasl1data.data);
  await task1();
  return result;
    } else {
    console.log(logindata);
    return "好游快爆每日任务:\n" + logindata.key;
  }
}


/*async function zhuli() {
    await get("2021zhuli", "login")
    for (i of new Array(5)) {
        await get("2021zhuli", "share")
    } //分享
    for (i of [1, 2, 3, 4, 5]) {
        await get("2021zhuli", `checklingqu&num=${i}`)
        await get("2021zhuli", `lingqu&num=${i}`)
    }
    await get("friend", "LingXinrenFuli")
    await get("yearend", "login")
    await get("yearend", "send&content=新年快乐&status=0")
}

*/

//  助力抽奖通用
async function jhy(id) {
    let logindata = await get("zhuli", `login&comm_id=${id}`)
    if (logindata.loginStatus == 100 && logindata.key == "ok") {
        uid = logindata.config.uid
        for (i = 0; i < 3; i++) {
            await get("zhuli", `zhuli&uid=${uid}&comm_id=${id}`)
            await get("zhuli", `choujiang&isdown=1&comm_id=${id}`)
            await sleep(1000)
        }
    }
}

//快爆粉丝福利80080
async function lottery2(a, b, c) {
    await get(`${a}/m`, `login&comm_id=${b}&isyuyue=0`)
    for (i of c) {
        await get(`${a}/m`, `DailyAppJump&comm_id=${b}&isyuyue=0&id=${i}`)
        await get(`${a}/m`, `DailyAppLing&comm_id=${b}&isyuyue=0&id=${i}`)
        await get(`${a}/m`, `chouqu&comm_id=${b}&isyuyue=0&id=${i}`)
        await get(`${a}/m`, `BaoXiangLing&comm_id=${b}&isyuyue=0&id=${i}`)
    }
    for (lid of [3, 4, 5]) {
        await get(`lottery/m`, `duihuanprize&comm_id=${lid}&resure=1&isyuyue=0&dhid=6`)
        await get(`lottery/m`, `duihuanprize&comm_id=${lid}&resure=1&isyuyue=0&dhid=5`)
    }

}

//游戏单  4.8
async function glist() {
    for (typeid of ["qq", "wx", "weibo"]) {
        await get("glist", `share&typeid=${typeid}&comm_id=1`)
        await sleep(1000)
    }
    await get("glist", "receiveBmh&comm_id=1")

}

async function fx() {
    await get("yuyue/m","checkfx&comm_id=99&isyuyue=0&isfx=1")
    await get("yuyue/m","checkfx&comm_id=99&isyuyue=0&isfx=1")
    await get("yuyue2020/m","choujiang&comm_id=99&isyuyue=0&isdown=1&isdownonly=1")
}




Date.prototype.Format = function(fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function getToday() {
    return new Date().Format("yyyy-MM-dd+hh:mm:ss")
}

//榜单游戏分享
async function gt() {
 id = await hd()
 console.log(id)
 y= getToday()
 get("gs",`shareback&gameid=${id}&t=${y}`)
 t = getToday()
 get("gs",`supershare&gameid=${id}&t=${t}`,"")
 r= getToday()
 get("gs",`superling&gameid=${id}&t=${r}`,"")
}

async function hd() {
      let res = await $http.post( 
         "https://huodong3.3839.com/hykb/gs2/",
       {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 8.0.0; FRD-AL10 Build/HUAWEIFRD-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045224 Mobile Safari/537.36 V1_AND_SQ_7.1.0_0_TIM_D TIM/3.0.0.2860 QQ/6.5.5  NetType/WIFI WebP/0.3.0 Pixel/1080",
          },
        }
      );
      id= res.data.match(/HdmodelUser\.YouxiInfo\((\d+)\)/)[1]
      return id
}

async function task1() {
    console.log(`临时任务列表：
1：粉丝福利12344,80080,25525,630630,79979都可以去首页搜索对应数字绑定qq
2：游戏单第7期
3：2021助力活动`)
  //  await zhuli()
    console.log("粉丝福利任务开始,记得去app中首页分别搜索80080 25525 630630 79979进行qq号绑定哦！！")
    await lottery2("lottery2", 2, [1, 2, 3, 6, 7, 8, 9, 10])
    await lottery2("lottery", 5, [1, 2, 3, 4, 6, 7])
    await lottery2("lottery", 4, [1, 2, 4, 5, 6, 8,14])
    await lottery2("lottery", 3, [1, 2, 3, 6, 7, 8, 14])
    await lottery2("lottery", 9, [1, 3, 4, 5, 7, 8])
    //await get(`lottery/m`, "duihuanprize&comm_id=9&resure=1&isyuyue=0&dhid=2")
   // await get(`lottery/m`, "duihuanprize&comm_id=9&resure=1&isyuyue=0&dhid=1")
    result += "新增粉丝福利任务12344,粉丝福利任务开始,记得去app中首页分别搜索80080 25525 630630 79979进行qq号绑定哦！！"
    console.log("四周年活动开始,请去活动里绑定qq哦,社区-四周年-活动1")
    await glist()
    await fx()
    for (i = 0; i < 3; i++) {
     await gt()
     await sleep(1000)
    }
   // await szn()
    for (id of [32,33,34]){
    await jhy(id)
    }
}

module.exports = task;
