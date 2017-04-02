import { HtmlElement, FlexRow, Button, Icon, Link, Menu, Submenu, DocumentTitle } from 'cx/widgets';
import { ContentPlaceholder } from 'cx/ui';
import './icons';
import { auth } from 'api';
import Controller from './Controller';

export default <cx>
   <div class="app" controller={Controller}>
      <div class="header">
         <FlexRow class="max-width" hspacing align="center">
            <Link href="~/" baseClass="button" mod="hollow" visible:expr="{url}!='~/'">
               <Icon name="arrow_back"  />
            </Link>
            <Icon name="timeline"  visible:expr="{url}=='~/'" />
            <ContentPlaceholder name="header" />
            <Menu horizontal style="display: flex;">
               <Submenu placement="down-left">
                  <span><Icon name="share" /></span>
                  <Menu putInto="dropdown">
                     <a href="#" onClick="shareOnFacebook">Facebook</a>
                     <a href="#" onClick="shareOnTwitter">Twitter</a>
                     <a href="#" onClick="shareOnLinkedIn">LinkedIn</a>
                     <a href="#" onClick="shareOnGooglePlus">Google Plus</a>
                  </Menu>
               </Submenu>
            </Menu>
            <Link href="~/sign-in" baseClass="button" mod="hollow" visible:expr="{user.uid} == null">
               Sign In
            </Link>
            <Menu horizontal visible:expr="{user.uid} != null" style="line-height: 0">
               <Submenu placement="down-left" style="line-height: 0">
                  <img src:bind="user.photoURL" style="height: 40px;" />
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
      </div>
      <div class="max-width">
         <ContentPlaceholder />
         <ContentPlaceholder name="footer" />
      </div>
      <DocumentTitle value=" - World Bank Data Reports" />
   </div>
</cx>
