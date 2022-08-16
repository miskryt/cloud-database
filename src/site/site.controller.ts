import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class SiteController {
  @Get('')
  @Render('home')
  index() {
    return { message: 'Index page of site!' };
  }

  @Get('login')
  @Render('login')
  login() {}
}
