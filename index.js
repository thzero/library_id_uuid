import { v4 as uuidv4 } from 'uuid';

class IdUtility {
	static generateId() {
		return uuidv4();
	}

	static generateLongId() {
		return uuidv4();
	}

	static generateShortId() {
		return uuidv4();
	}

	static setAlphabet(alphabet) {
	}

	static setLengthLong(length) {
	}

	static setLengthShort(length) {
	}

	// uuid has no short form, so both directions are identity - the same contract
	// library_id_nanoid implements. Returning nothing meant a caller could not
	// round trip an id through this generator.
	static translateToShortId(id) {
		return id;
	}

	static translateToId(id) {
		return id;
	}
}

export default IdUtility;
