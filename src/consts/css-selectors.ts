import { Game } from '../types/sport.js';

// export const SOCCER_LEAGUES_ANCHORS = '#archive-tables table.table-main [xsid="1"] td a';
export const SOCCER_CAMPIONAT_ANCHORS = 'div.main-menu2.main-menu-gray ul.main-filter li a';
export const SOCCER_CAMPIONAT_PAGINATOR_ANCHORS = '#tournamentTable #pagination a';
export const TOURNAMENT_TABLE_TBODY = '#tournamentTable tbody';
export const MATCHES_TBODY = '#table-matches tbody';
export const TOURNAMENT_TABLE_HEADER = '#tournamentTable tbody .center.nob-border';

export const LEAGUES_ANCHORS: { [key in Game]: string } = {
	SOCCER: '#archive-tables table.table-main [xsid="1"] td a',
	BASKETBALL: '#archive-tables table.table-main [xsid="3"] td a',
	BASEBALL: '#archive-tables table.table-main [xsid="6"] td a',
	E_SPORTS: '#archive-tables table.table-main [xsid="36"] td a',
	HOCKEY: '#archive-tables table.table-main [xsid="4"] td a',
	TENNIS: '#archive-tables table.table-main [xsid="2"] td a',
	AMERICAN_FOOTBALL: '#archive-tables table.table-main [xsid="5"] td a',
	AUSSIE_RULES: '#archive-tables table.table-main [xsid="18"] td a',
	BADMINTON: '#archive-tables table.table-main [xsid="21"] td a',
	BANDY: '#archive-tables table.table-main [xsid="10"] td a',
	BEACH_SOCCER: '#archive-tables table.table-main [xsid="26"] td a',
	BEACH_VOLLEYBALL: '#archive-tables table.table-main [xsid="17"] td a',
	BOXING: '#archive-tables table.table-main [xsid="16"] td a',
	CRICKET: '#archive-tables table.table-main [xsid="13"] td a',
	DARTS: '#archive-tables table.table-main [xsid="14"] td a',
	FLOORBALL: '#archive-tables table.table-main [xsid="9"] td a',
	FUTSAL: '#archive-tables table.table-main [xsid="11"] td a',
	HANDBALL: '#archive-tables table.table-main [xsid="7"] td a',
	MMA: '#archive-tables table.table-main [xsid="28"] td a',
	PESAPALLO: '#archive-tables table.table-main [xsid="30"] td a',
	RUGBY_LEAGUE: '#archive-tables table.table-main [xsid="19"] td a',
	RUGBY_UNION: '#archive-tables table.table-main [xsid="8"] td a',
	SNOOKER: '#archive-tables table.table-main [xsid="15"] td a',
	VOLLEYBALL: '#archive-tables table.table-main [xsid="12"] td a',
	WATER_POLO: '#archive-tables table.table-main [xsid="22"] td a'
};
