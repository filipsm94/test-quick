import { ILeadModel, ITeamModel } from "../models/state.model"

export const empytLead: ILeadModel = {
    name: '',
    location: {
        code: '',
        name: '',
        timezone: ''
    }
}

export const empytTeam: ITeamModel = {
    location: {
        code: '',
        name: '',
        timezone: ''
    },
    amount: 0
}