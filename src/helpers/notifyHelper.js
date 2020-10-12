import { getEtherscanTxLink } from 'helpers/explorers';
import useInterval from 'hooks/useInterval';

export function notifyHandler(notify, hash, networkId, callback, message) {
	let { emitter } = notify.hash(hash);
	emitter.on('all', () => {});
	emitter.on('txConfirmed', result => {
		useInterval(() => {
			callback();
		}, 5000);

		return {
			message: message ? message : undefined,
			onclick: () =>
				window.open(
					`${getEtherscanTxLink(networkId, result.hash)}`,
					'_blank',
					'noopener, norefferer'
				),
			autoDismiss: false,
		};
	});
}

export function notifyNotification(notify, message, type = 'pending') {
	let notificationObject = {
		eventCode: 'notification',
		type: type,
		message: message,
	};

	return notify.notification(notificationObject);
}
