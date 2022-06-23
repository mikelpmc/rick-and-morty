import React from 'react';
import Hello from './components/hello';

const App = (): JSX.Element => (
	<div>
		<h1>Rick And Morty pet project</h1>
		<Hello name="Jerry" />
	</div>
);

export default App;
