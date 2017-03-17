import { HtmlElement, FlexRow, Button, Icon, Link, Menu, Submenu, DocumentTitle } from 'cx/widgets';
import { ContentPlaceholder } from 'cx/ui';
import './icons';
import { auth } from 'api';

export default <cx>
   <div class="app">
      <FlexRow class="header" hspacing align="center">
         <Link href="~/" baseClass="button" mod="hollow" visible:expr="{url}!='~/'">
            <Icon name="arrow_back"  />
         </Link>
         <Icon name="timeline"  visible:expr="{url}=='~/'" />
         <ContentPlaceholder name="header" />
         <Link href="~/sign-in" baseClass="button" mod="hollow" visible:expr="{user.uid} == null">
            Sign In
         </Link>
         <Menu horizontal visible:expr="{user.uid} != null">
            <Submenu placement="down-left" style="line-height: 0">
               <img src:bind="user.photoURL" style="height: 32px;line-height:0" />
               <Menu putInto="dropdown">
                  <a
                      href="#"
                      onClick={e=> {
                          e.preventDefault();
                          auth.signOut();
                      }}
                  >Sign Out</a>
               </Menu>
            </Submenu>
         </Menu>
      </FlexRow>
      <ContentPlaceholder />
      <ContentPlaceholder name="footer" />
      <DocumentTitle value=" - World Bank Data Reports" />
   </div>
</cx>
