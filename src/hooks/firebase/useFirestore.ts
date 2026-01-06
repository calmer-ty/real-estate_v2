import { useCallback, useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebaseApp";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { convertFirestoreData } from "@/commons/utils/convertFirestoreType";

import type { DocumentData } from "firebase/firestore";
import type { IWriteForm, IFirestore } from "@/commons/types";

interface IUseFirestoreReturn {
  loading: boolean;
  userBuildings: DocumentData[];
  createFirestore: (data: IWriteForm, colName: string) => Promise<void>;
  updateFirestore: (data: Partial<IWriteForm>, colName: string, docId: string) => Promise<void>;
  archiveFirestore: (data: IFirestore, colName: string) => Promise<void>;
  deleteFirestore: (colName: string, docId: string) => Promise<void>;
  readFirestore: (colName: string, docId: string) => Promise<IFirestore | undefined>;
  readFirestores: (colName: string) => Promise<IFirestore[]>;
  fetchBuildings: () => Promise<void>;
}

export const useFirestore = (): IUseFirestoreReturn => {
  const [userBuildings, setUserBuildings] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);

  const createFirestore = useCallback(async (data: IWriteForm, colName: string) => {
    try {
      const docRef = await addDoc(collection(db, colName), {
        ...data,
        createdAt: serverTimestamp(), // 서버 시간 추가
      });

      // 문서 ID를 포함한 데이터로 업데이트
      await updateDoc(docRef, {
        _id: docRef.id,
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const updateFirestore = useCallback(async (data: Partial<IWriteForm>, colName: string, docId: string) => {
    const docRef = doc(db, colName, docId);
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const deleteFirestore = useCallback(async (colName: string, docId: string) => {
    try {
      await deleteDoc(doc(db, colName, docId));
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const archiveFirestore = useCallback(async (data: IFirestore, colName: string) => {
    try {
      const docRef = await addDoc(collection(db, colName), {
        ...data,
        deletedAt: serverTimestamp(), // 삭제된 시간 기록
      });
      // 문서 ID를 포함한 데이터로 업데이트
      await updateDoc(docRef, {
        _id: docRef.id,
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const readFirestore = useCallback(async (colName: string, docId: string) => {
    const docRef = doc(db, colName, docId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data != null) {
          return convertFirestoreData(data);
        }
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const readFirestores = useCallback(async (colName: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, colName));
      const data = querySnapshot.docs.map((el) => el.data() as IFirestore);
      return data;
    } catch (error) {
      console.error("Error fetching buildings:", error);
      return [];
    }
  }, []);

  // 조회 함수
  const fetchBuildings = useCallback(async () => {
    // if (!user) return;

    // const uid = user.uid;
    setLoading(true);

    try {
      // 년/월 데이터를 제한하여 한정적으로 데이터 쿼리
      // const q = getUserDateQuery(uid, "products", selectedYear, selectedMonth);

      const querySnapshot = await getDocs(collection(db, "buildings"));

      const buildingsData = querySnapshot.docs.map((el) => el.data());
      setUserBuildings(buildingsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings]);

  return { loading, userBuildings, createFirestore, updateFirestore, archiveFirestore, deleteFirestore, readFirestore, readFirestores, fetchBuildings };
};
