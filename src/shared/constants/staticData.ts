export interface Option {
    id: string
    name: string
}

export const MASTER_DATA = {
    channelPartnerType: ['International Channel Partner (IPC)', 'Institutional Channel Partner (ICP)', 'Retail Channel Partner (RCP)'],
    firmsType: ['LLP', 'Private Limited Company', 'Proprietorship'],
}


export const toOptions = (list: readonly string[]): Option[] =>
    list.map(item => ({ id: item, name: item }))

export const CHANNE_PARTNER_TYPE = toOptions(MASTER_DATA.channelPartnerType);
export const FIRMS_TYPE_OPTIONS = toOptions(MASTER_DATA.firmsType)
