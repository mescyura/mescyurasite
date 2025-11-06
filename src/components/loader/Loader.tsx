import classes from './Loader.module.css';

const Loader = () => {
	return (
		<div className={classes.loader_overlay}>
			<div className={classes.spinner}>
				<div className={classes.spinner_circle}></div>
				<div className={classes.spinner_circle}></div>
				<div className={classes.spinner_circle}></div>
			</div>
		</div>
	);
};

export default Loader;

