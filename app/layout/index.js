import { HtmlElement, FlexRow, Button, Icon, Link } from 'cx/widgets';
import { ContentPlaceholder } from 'cx/ui';
import './icons';

export default <cx>
   <div class="app">
      <FlexRow class="header" hspacing align="center">
         <Link href="~/" baseClass="button" mod="hollow" visible:expr="{url}!='~/'">
            <Icon name="arrow_back"  />
         </Link>
         <Link href="~/" baseClass="button" mod="hollow" visible:expr="{url}=='~/'">
            <Icon name="insert_chart"  />
         </Link>
         <ContentPlaceholder name="header" />
         <Link href="~/sign-in" baseClass="button" mod="hollow" visible:expr="{user.uid} == null">
            Sign In
         </Link>
         <img src:bind="user.photoURL" style="height: 32px" />
      </FlexRow>
      <ContentPlaceholder />
      <ContentPlaceholder name="footer" />
   </div>
</cx>
