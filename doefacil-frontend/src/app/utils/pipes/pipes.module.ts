import { NgModule } from "@angular/core";
import { DateStrPipe } from "./date-str.pipe";
import { AgePipe } from "./age.pipe";

// other imports

@NgModule({
	imports: [
		// dep modules
	],
	declarations: [DateStrPipe, AgePipe],
	exports: [DateStrPipe, AgePipe],
})
export class PipesModule {}
