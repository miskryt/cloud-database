import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class SiteController {
  @Get('')
  @Render('index')
  index() {
    return { message: 'Index page of site!' };
  }
}
