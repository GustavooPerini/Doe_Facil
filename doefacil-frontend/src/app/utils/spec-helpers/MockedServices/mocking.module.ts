import { NgModule } from "@angular/core";
import * as servs from "./mocked-services"


@NgModule({
    providers: [servs.MockedPADAgendaDateService, servs.MockedSchedulingService, servs.MockedPADAgendaHourService,
                servs.MockedPADAgendaService, servs.MockedPatientService, servs.MockedAutoCompleteService,
                servs.MockedStorageService, servs.MockedViaCepService, servs.MockedUserService, servs.MockedAppointmentService,
                servs.MockedConfigService, servs.MockedMonitorService, servs.MockedPreceptorService]
  })
export class MockingModule { }