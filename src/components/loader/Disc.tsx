import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
	size?: number | string;
}

const MyCustomIcon: React.FC<IconProps> = ({ size = 320, ...props }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 320 320'
			version='1.0'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			{...props}
		>
			<defs>
				<linearGradient id='linearGradient1601'>
					<stop offset='0' style={{ stopColor: '#ffffff' }} />
					<stop offset='1' style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
				</linearGradient>
				<linearGradient id='linearGradient1753'>
					<stop
						offset='0'
						style={{ stopColor: '#000000', stopOpacity: 0.4549 }}
					/>
					<stop offset='1' style={{ stopColor: '#000000', stopOpacity: 0 }} />
				</linearGradient>
				<linearGradient id='linearGradient1608'>
					<stop
						offset='0'
						style={{ stopColor: '#000000', stopOpacity: 0.45517 }}
					/>
					<stop
						offset='1'
						style={{ stopColor: '#ffffff', stopOpacity: 0.46207 }}
					/>
				</linearGradient>

				<linearGradient
					id='linearGradient1865'
					gradientTransform='matrix(1,0,0,1,0,0)'
					xlinkHref='#linearGradient1601'
					x1='2.0435'
					y1='-1.1528'
					x2='0.17779'
					y2='0.67868'
				/>
				<linearGradient
					id='linearGradient1863'
					xlinkHref='#linearGradient1601'
					x1='2.1829'
					y1='-1.8578'
					x2='-0.060938'
					y2='0.59359'
				/>
				<linearGradient
					id='linearGradient848'
					x1='0.37863'
					y1='0.66667'
					x2='-0.10552'
					y2='1.3697'
				>
					<stop offset='0' style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
					<stop offset='1' style={{ stopColor: '#ffffff' }} />
				</linearGradient>
				<linearGradient
					id='linearGradient1731'
					xlinkHref='#linearGradient1601'
					x1='-0.016'
					y1='2.1953'
					x2='0.608'
					y2='0.4375'
				/>
				<linearGradient
					id='linearGradient1761'
					xlinkHref='#linearGradient1753'
					x1='2.1068'
					y1='-1.3203'
					x2='0.38835'
					y2='0.89062'
				/>
				<linearGradient
					id='linearGradient1751'
					xlinkHref='#linearGradient1753'
					x1='2.9824'
					y1='-2.9226'
					x2='0.3029'
					y2='0.70859'
				/>
				<linearGradient
					id='linearGradient1752'
					xlinkHref='#linearGradient1601'
					x1='-1.2828'
					y1='3.167'
					x2='0.74848'
					y2='0.4742'
				/>
				<linearGradient
					id='linearGradient1607'
					xlinkHref='#linearGradient1601'
					x1='1.3883'
					y1='-0.92969'
					x2='0.32039'
					y2='0.85156'
				/>
				<linearGradient
					id='linearGradient1738'
					xlinkHref='#linearGradient1601'
					x1='-0.032'
					y1='2.1484'
					x2='0.832'
					y2='0.44531'
				/>
				<linearGradient
					id='linearGradient1604'
					xlinkHref='#linearGradient1608'
					x1='0.6129'
					y1='-0.27097'
					x2='0.6129'
					y2='0.76129'
				/>
				<linearGradient
					id='linearGradient1855'
					xlinkHref='#linearGradient1608'
					x1='2.0621'
					y1='1.8264'
					x2='0.30588'
					y2='-0.23828'
				/>
				<linearGradient
					id='linearGradient1757'
					xlinkHref='#linearGradient1601'
					x1='0.48837'
					y1='1.4844'
					x2='0.68992'
					y2='0.53906'
				/>
				<linearGradient
					id='linearGradient1848'
					x1='0.83439'
					y1='0.68153'
					x2='0.63694'
					y2='-0.12102'
				>
					<stop
						offset='0'
						style={{ stopColor: '#000000', stopOpacity: 0.58621 }}
					/>
					<stop
						offset='0.73635'
						style={{ stopColor: '#000000', stopOpacity: 0.31034 }}
					/>
					<stop offset='1' style={{ stopColor: '#5f5f5f', stopOpacity: 0 }} />
				</linearGradient>
				<linearGradient
					id='linearGradient1616'
					x1='0.48855'
					y1='0.00769'
					x2='0.83969'
					y2='1.0231'
				>
					<stop offset='0' style={{ stopColor: '#868686' }} />
					<stop offset='0.3935' style={{ stopColor: '#f3f3f3' }} />
					<stop offset='0.4794' style={{ stopColor: '#949494' }} />
					<stop offset='1' style={{ stopColor: '#d3d3d3' }} />
				</linearGradient>
			</defs>
			<g transform='matrix(0.77697, 0, 0, 0.77697, -70.538, -38.49)'>
				<path
					id='path965'
					style={{
						fillRule: 'evenodd',
						stroke: 'url(#linearGradient1848)',
						strokeWidth: 1.2732,
						strokeOpacity: 0.58491,
						fill: 'url(#linearGradient1616)',
					}}
					transform='matrix(1.4062, 0, 0, 1.4062, 472.41, -428.38)'
					d='M-122.31,353.84 C-194.09,353.84 -252.38,412.09 -252.38,483.88 C-252.38,555.66 -194.09,613.94 -122.31,613.94 C-50.531,613.94 7.729,555.66 7.729,483.88 C7.7278,412.09 -50.5222,353.84 -122.31,353.84 Z M-122.31,443.16 C-99.837,443.16 -81.594,461.4 -81.594,483.88 C-81.594,506.35 -99.837,524.59 -122.31,524.59 C-144.79,524.59 -163.03,506.35 -163.03,483.88 C-163.03,461.4 -144.79,443.16 -122.31,443.16 Z'
				/>
				<path
					id='path1756'
					style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1757)' }}
					transform='matrix(1.0074, 0, 0, 1.0074, 20.47, -97.517)'
					d='M276.45,182.08 C178.27,182.08 100,248.8 100,346.98 C100.003,445.16 179.72,524.88 277.9,524.88 C376.09,524.88 455.76,445.16 455.76,346.98 S374.65,182.08 276.45,182.08 Z M277.89,291.29 C308.64,291.29 333.59,316.24 333.59,346.98 C333.59,377.72 308.64,402.68 277.89,402.68 C247.15,402.68 222.2,377.72 222.2,346.98 C222.2,316.24 247.15,291.29 277.89,291.29 Z'
				/>
				<path
					id='path964'
					style={{
						fillRule: 'evenodd',
						stroke: 'url(#linearGradient1604)',
						strokeWidth: 0.84881,
						fill: 'url(#linearGradient1855)',
					}}
					transform='matrix(1.4062, 0, 0, 1.4062, 472.41, -428.38)'
					d='M-122.31,439.15 C-147,439.15 -167.04,459.19 -167.04,483.88 C-167.04,508.56 -147,528.6 -122.31,528.6 C-97.623,528.6 -77.584,508.56 -77.584,483.88 C-77.584,459.19 -97.623,439.15 -122.31,439.15 Z M-122.79,462.63 C-111.07,462.63 -101.54,472.15 -101.54,483.88 C-101.54,495.6 -111.07,505.12 -122.79,505.12 C-134.52,505.12 -144.04,495.6 -144.04,483.88 C-144.04,472.15 -134.52,462.63 -122.79,462.63 Z'
				/>
				<g transform='matrix(-1.4028, 0.098032, -0.098032, -1.4028, 174.53, 941.7)'>
					<path
						id='path1746'
						style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1738)' }}
						d='M-113.82,438.88 L-96.822,356.1 C-73.354,361.07 -27.814,387.32 -15.269,409.54 L-86.305,457.2 C-86.708,453.1 -104.74,440.04 -113.82,438.88 Z'
					/>
					<path
						id='path1747'
						style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1607)' }}
						d='M-102.63,442.44 L-70.865,364.24 C-57.067,372.26 -41.075,380.45 -29.826,393.05 L-89.358,453.13 C-92.307,450.05 -97.61,445.38 -102.63,442.44 Z'
					/>
					<g transform='matrix(-1, 0, 0, -1, -346.85, 969.17)'>
						<path
							id='path1749'
							style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1752)' }}
							d='M-214.83,441.1 L-197.83,358.33 C-174.36,363.29 -128.82,389.55 -116.27,411.77 L-187.31,459.43 C-187.71,455.33 -205.74,442.27 -214.83,441.1 Z'
						/>
						<path
							id='path1750'
							style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1751)' }}
							d='M-203.63,444.67 L-171.87,366.47 C-158.07,374.49 -143.58,383.95 -132.56,397.01 L-190.36,455.35 C-193.31,452.28 -198.61,447.61 -203.63,444.67 Z'
						/>
					</g>
				</g>
				<g transform='matrix(0.83738, 1.1297, -1.1297, 0.83738, 948.65, -14.524)'>
					<path
						id='path1730'
						style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1738)' }}
						d='M-113.82,438.88 L-96.822,356.1 C-73.354,361.07 -27.814,387.32 -15.269,409.54 L-86.305,457.2 C-86.708,453.1 -104.74,440.04 -113.82,438.88 Z'
					/>
					<path
						id='path1606'
						style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1761)' }}
						d='M-102.63,442.44 L-70.865,364.24 C-57.067,372.26 -42.574,381.72 -31.556,394.78 L-89.358,454.59 C-92.307,451.51 -97.61,446.84 -102.63,442.44 Z'
					/>
					<g transform='matrix(-1, 0, 0, -1, -346.85, 969.17)'>
						<path
							id='path1732'
							style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1731)' }}
							d='M-214.83,441.1 L-197.83,358.33 C-174.36,363.29 -128.82,389.55 -116.27,411.77 L-187.31,459.43 C-187.71,455.33 -205.74,442.27 -214.83,441.1 Z'
						/>
						<path
							id='path1733'
							style={{ fillRule: 'evenodd', fill: 'url(#linearGradient848)' }}
							d='M-203.63,444.67 L-171.87,366.47 C-158.07,374.49 -143.58,383.95 -132.56,397.01 L-190.36,455.35 C-193.31,452.28 -198.61,447.61 -203.63,444.67 Z'
						/>
					</g>
				</g>
				<g transform='matrix(0.0065143, 1.4062, -1.4062, 0.0065143, 980.2, 421.16)'>
					<path
						id='path1859'
						style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1863)' }}
						d='M-102.63,442.44 L-70.865,364.24 C-57.067,372.26 -42.574,381.72 -31.556,394.78 L-89.358,453.13 C-92.307,450.05 -97.61,445.38 -102.63,442.44 Z'
					/>
					<g transform='matrix(-1, 0, 0, -1, -346.85, 969.17)'>
						<path
							id='path1862'
							style={{ fillRule: 'evenodd', fill: 'url(#linearGradient1865)' }}
							d='M-203.63,444.67 L-172.97,367.19 C-159.17,375.21 -143.57,382.49 -132.55,395.55 L-190.36,455.35 C-193.31,452.28 -198.61,447.61 -203.63,444.67 Z'
						/>
					</g>
				</g>
			</g>
		</svg>
	);
};

export default MyCustomIcon;
