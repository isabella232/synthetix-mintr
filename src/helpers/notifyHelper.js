import { getEtherscanTxLink } from 'helpers/explorers';

export function notifyHandler(notify, hash, networkId, callback, message) {
	let { emitter } = notify.hash(hash);
	emitter.on('txConfirmed', result => {
		setTimeout(() => {
			callback();
		}, 15000);
		return {
			message: message ? message : undefined,
			link: getEtherscanTxLink(networkId, result.hash),
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