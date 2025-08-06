import { NgModule } from "@angular/core";
import { DateStrPipe } from "./date-str.pipe";
import { AgePipe } from "./age.pipe";
import { EnumOrderPipe } from "./enum-order.pipe";

// other imports

@NgModule({
	imports: [
		// dep modules
	],
	declarations: [DateStrPipe, AgePipe, EnumOrderPipe],
	exports: [DateStrPipe, AgePipe, EnumOrderPipe],
})
export class PipesModule {}
