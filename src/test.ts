import { log } from "iggs-utils";
import { SOCCER_LEAGUES_URL } from "./consts/urls.js";
import { Fixture } from "./entities/fixture.js";
import { appDataSource } from "./orm/orm.js";
import { getCampionatLastPage, getCampionatList } from "./services.ts/campionat.js";
import { writeError } from "./services.ts/error.js";
import { getFixtures } from "./services.ts/fixture.js";
import { getLeagueList } from "./services.ts/league.js";
import { getPage, initBrowser } from "./services.ts/puppeter.js";
import { Game } from "./types/sport.js";

initBrowser();


(async () => {
    // https://www.oddsportal.com/soccer/brazil/brasileiro-u20-2020/results/
    await initBrowser();
//    const ds = await appDataSource.initialize();
//    const repoFix = ds.getRepository(Fixture);



    const page = await getPage("https://www.oddsportal.com/soccer/africa/africa-cup-of-nations-2019/results/#/page/4");
    // const campionati = await getCampionatList(page);
    // const sessions = 

    var fixtures = await getFixtures(page);

    for(const fixture of fixtures){
        fixture.campionat="campionat"
        fixture.game=Game.SOCCER;
        fixture.league="league";
    }

    fixtures=fixtures.filter(f=> !!f.date);

    const start=Date.now();
    //  for(const fixture of fixtures){
        // await repoFix.save(fixtures);
    //  }


    writeError(new Error(import { log } from "iggs-utils";
import { SOCCER_LEAGUES_URL } from "./consts/urls.js";
import { Fixture } from "./entities/fixture.js";
import { appDataSource } from "./orm/orm.js";
import { getCampionatLastPage, getCampionatList } from "./services.ts/campionat.js";
import { writeError } from "./services.ts/error.js";
import { getFixtures } from "./services.ts/fixture.js";
import { getLeagueList } from "./services.ts/league.js";
import { getPage, initBrowser } from "./services.ts/puppeter.js";
import { Game } from "./types/sport.js";

initBrowser();


(async () => {
    // https://www.oddsportal.com/soccer/brazil/brasileiro-u20-2020/results/
    await initBrowser();
//    const ds = await appDataSource.initialize();
//    const repoFix = ds.getRepository(Fixture);



    const page = await getPage("https://www.oddsportal.com/soccer/africa/africa-cup-of-nations-2019/results/#/page/4");
    // const campionati = await getCampionatList(page);
    // const sessions = 

    var fixtures = await getFixtures(page);

    for(const fixture of fixtures){
        fixture.campionat="campionat"
        fixture.game=Game.SOCCER;
        fixture.league="league";
    }

    fixtures=fixtures.filter(f=> !!f.date);

    const start=Date.now();
    //  for(const fixture of fixtures){
        // await repoFix.save(fixtures);
    //  }


    writeError(new Error('error sdfsdfsdf'), fixtures, "www.sdf.com");

    const end=Date.now();



    
    console.log(fixtures.length+' writted in '+(end-start)+' ms');
})()



