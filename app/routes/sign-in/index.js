import {HtmlElement, DocumentTitle, Section, Button} from "cx/widgets";

import Controller from "./Controller";

export default (
	<cx>
		<DocumentTitle value="Sign In"/>


		<div class="page" controller={Controller}>
			<h1 putInto="header"></h1>
			<div class="prose">
				<h2>Sign In</h2>
				<p>
					By signing in you'll get the ability to save your reports and star reports made by other people.
				</p>
				<p>
					Please choose one of available sign-in options:
				</p>

				<Button mod="sign-in" class="google" onClick="signInWithGoogle">
					<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"/>
					Sign in with Google
				</Button>

				<Button mod="sign-in" class="facebook" onClick="signInWithFacebook">
					<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"/>
					Sign in with Facebook
				</Button>

				<Button mod="sign-in" class="twitter" onClick="signInWithTwitter">
					<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg"/>
					Sign in with Twitter
				</Button>

				<Button mod="sign-in" class="github" onClick="signInWithGitHub">
					<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg"/>
					Sign in with GitHub
				</Button>

				{/*<Button mod="sign-in" class="email" onClick="signInWithEmail">*/}
					{/*<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"/>*/}
					{/*Sign in with email*/}
				{/*</Button>*/}

				<br/>
			</div>
		</div>
	</cx>
);
