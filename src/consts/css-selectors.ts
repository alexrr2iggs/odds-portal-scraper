import { Game } from "../types/sport.js";

// export const SOCCER_LEAGUES_ANCHORS = '#archive-tables table.table-main [xsid="1"] td a';
export const SOCCER_CAMPIONAT_ANCHORS = 'div.main-menu2.main-menu-gray ul.main-filter li a';
export const SOCCER_CAMPIONAT_PAGINATOR_ANCHORS = '#tournamentTable #pagination a';
export const SOCCER_CAMPIONAT_TBODY = '#tournamentTable tbody';

export const LEAGUES_ANCHORS: { [key in Game]: string } = {
    SOCCER: '#archive-tables table.table-main [xsid="1"] td a',
    BASKETBALL: '#archive-tables table.table-main [xsid="3"] td a',
    BASEBALL: '#archive-tables table.table-main [xsid="6"] td a',
}