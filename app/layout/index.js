import {HtmlElement, FlexRow, Button, Icon, Link, Menu, Submenu, DocumentTitle} from 'cx/widgets';
import {ContentPlaceholder} from 'cx/ui';
import './icons';
import {getAuth} from 'api';
import Controller from './Controller';

export default <cx>
    <div class="app" controller={Controller}>
        <div
            class={{
                "header": true,
                "home": {expr: "{url}=='~/'"}
            }}
        >
            <FlexRow class="max-width" hspacing align="center">
                <Link href="~/" baseClass="button" mod="hollow" visible:expr="{url}!='~/'">
                    <Icon name="arrow_back"/>
                </Link>
                <Icon name="timeline" visible:expr="{url}=='~/'"/>
                <ContentPlaceholder name="header"/>
                <Menu horizontal style="display: flex;">
                    <Submenu placement="down-left">
                        <span><Icon name="share"/></span>
                        <Menu putInto="dropdown">
                            <a href="#" onClick="shareOnFacebook">Facebook</a>
                            <a href="#" onClick="shareOnTwitter">Twitter</a>
                            <a href="#" onClick="shareOnLinkedIn">LinkedIn</a>
                            <a href="#" onClick="shareOnGooglePlus">Google Plus</a>
                        </Menu>
                    </Submenu>
                </Menu>
                <Icon name="loading" visible:expr="{user.loading}"/>
                <Link href="~/sign-in" baseClass="button" mod="hollow"
                    visible:expr="{user.uid} == null && !{user.loading}">
                    Sign In
                </Link>
                <Menu horizontal visible:expr="{user.uid} != null" style="line-height: 0">
                    <Submenu placement="down-left" style="line-height: 0">
                        <img src:bind="user.photoURL" style="height: 40px;border-radius:20px"/>
                        <Menu putInto="dropdown">
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    getAuth().then(auth => {
                                        auth.signOut();
                                    })
                                }}
                            >Sign Out</a>
                        </Menu>
                    </Submenu>
                </Menu>
            </FlexRow>
        </div>
        <div class="max-width">
            <ContentPlaceholder />
            <ContentPlaceholder name="footer"/>
        </div>
        <DocumentTitle value=" - World Bank Data Reports"/>
    </div>
</cx>
